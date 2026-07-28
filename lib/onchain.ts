"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/brand";

const RPC = "https://worldchain.drpc.org";
/** Uniswap V3 WHOAMI/WLD — token0=WLD, token1=WHOAMI (used after graduation) */
const POOL_WHOAMI_WLD = "0xe211785c5ecd160612ee8277abed4aa01c0548a4";
/** Uniswap V3 USDC.e/WLD — token0=WLD, token1=USDC.e (6 decimals) */
const POOL_USDC_WLD = "0xc19bc89ac024426f5a23c5bb8bc91d8017c90684";
const TOKEN_API = `https://worldchain-mainnet.explorer.alchemy.com/api/v2/tokens/${LINKS.contract}`;

/** Same public anon key Ani Wallet ships in its frontend */
const ANI_SUPABASE = "https://gxdyhwkbbrblxshfajcx.supabase.co";
const ANI_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4ZHlod2tiYnJibHhzaGZhamN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODIwMjYsImV4cCI6MjA3MzU1ODAyNn0.9-uZm_k2NXVt2P16ZRGdCFjmiAfT3M2E0TuKiLkUgaU";

const TOTAL_SUPPLY_SIG = "0x18160ddd";
const DECIMALS_SIG = "0x313ce567";
const SLOT0_SIG = "0x3850c7bd";

export type OnChainInfo = {
  chainId: number;
  chain: string;
  symbol: string;
  decimals: number;
  supply: string;
  supplyRaw: string;
  holders: string;
  holdersRaw: number;
  price: string;
  priceUsd: number | null;
  marketCap: string;
  marketCapWld: number | null;
  loading: boolean;
  error: boolean;
};

const FALLBACK: OnChainInfo = {
  chainId: 480,
  chain: "World Chain",
  symbol: "WHOAMI",
  decimals: 18,
  supply: "300M",
  supplyRaw: "300,000,000",
  holders: "—",
  holdersRaw: 0,
  price: "—",
  priceUsd: null,
  marketCap: "—",
  marketCapWld: null,
  loading: false,
  error: false,
};

type AniLaunchpadRow = {
  market_cap_wld: number | null;
  current_price_num: number | null;
  graduated: boolean | null;
};

function formatSupply(raw: bigint, decimals: number): { short: string; full: string } {
  const base = 10n ** BigInt(decimals);
  const whole = raw / base;
  const full = whole.toLocaleString("en-US");
  if (whole >= 1_000_000_000n) {
    return {
      short: `${(Number(whole) / 1e9).toFixed(whole % 1_000_000_000n === 0n ? 0 : 1)}B`,
      full,
    };
  }
  if (whole >= 1_000_000n) {
    return {
      short: `${(Number(whole) / 1e6).toFixed(whole % 1_000_000n === 0n ? 0 : 1)}M`,
      full,
    };
  }
  return { short: full, full };
}

function formatUsd(price: number): string {
  if (!Number.isFinite(price) || price <= 0) return "—";
  if (price >= 1) return `$${price.toFixed(4)}`;
  if (price >= 0.01) return `$${price.toFixed(5)}`;
  if (price >= 0.000001) {
    const s = price.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
    return `$${s}`;
  }
  return `$${price.toExponential(2)}`;
}

function formatMarketCapWld(wld: number): string {
  if (!Number.isFinite(wld) || wld <= 0) return "—";
  if (wld >= 1_000_000) return `${(wld / 1e6).toFixed(2)}M WLD`;
  if (wld >= 10_000) return `${(wld / 1e3).toFixed(2)}K WLD`;
  if (wld >= 1_000) {
    return `${wld.toLocaleString("en-US", { maximumFractionDigits: 0 })} WLD`;
  }
  return `${wld.toFixed(2)} WLD`;
}

/** token1 / token0 from Uniswap V3 slot0 (same decimals) */
function ratioFromSlot0(slot0Hex: string): number {
  const sqrtPriceX96 = BigInt(slot0Hex.slice(0, 66));
  const adj = Number(sqrtPriceX96) / 2 ** 96;
  return adj * adj;
}

async function ethCall(to: string, data: string): Promise<string> {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [{ to, data }, "latest"],
    }),
  });
  const json = (await res.json()) as { result?: string };
  if (!json.result || json.result === "0x") throw new Error("rpc failed");
  return json.result;
}

async function fetchHolders(): Promise<number> {
  const res = await fetch(TOKEN_API);
  if (!res.ok) throw new Error("holders api failed");
  const json = (await res.json()) as { holders_count?: string | number };
  const n = Number(json.holders_count);
  if (!Number.isFinite(n)) throw new Error("invalid holders");
  return n;
}

/** WLD → USD via Uniswap V3 USDC.e/WLD pool */
async function fetchWldUsd(): Promise<number> {
  const usdcSlot = await ethCall(POOL_USDC_WLD, SLOT0_SIG);
  const usdcRawPerWldRaw = ratioFromSlot0(usdcSlot);
  return usdcRawPerWldRaw * 10 ** 12;
}

/** Pool WHOAMI price in WLD (only meaningful after graduation / with liquidity) */
async function fetchPoolPriceWld(): Promise<number> {
  const whoamiSlot = await ethCall(POOL_WHOAMI_WLD, SLOT0_SIG);
  const whoamiPerWld = ratioFromSlot0(whoamiSlot);
  return 1 / whoamiPerWld;
}

/**
 * Ani Wallet launchpad stats — same source as the in-app MCAP (WLD).
 * Token is still on the bonding curve until graduated.
 */
async function fetchAniLaunchpad(): Promise<AniLaunchpadRow | null> {
  const url =
    `${ANI_SUPABASE}/rest/v1/launchpad_tokens` +
    `?token_address=eq.${LINKS.contract}` +
    `&select=market_cap_wld,current_price_num,graduated`;
  const res = await fetch(url, {
    headers: {
      apikey: ANI_ANON_KEY,
      Authorization: `Bearer ${ANI_ANON_KEY}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("ani launchpad failed");
  const rows = (await res.json()) as AniLaunchpadRow[];
  return rows[0] ?? null;
}

export function useOnChainInfo(): OnChainInfo {
  const [info, setInfo] = useState<OnChainInfo>({
    ...FALLBACK,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [supplyHex, decimalsHex, holders, ani, wldUsd] = await Promise.all([
          ethCall(LINKS.contract, TOTAL_SUPPLY_SIG),
          ethCall(LINKS.contract, DECIMALS_SIG),
          fetchHolders().catch(() => null),
          fetchAniLaunchpad().catch(() => null),
          fetchWldUsd().catch(() => null),
        ]);
        const decimals = Number.parseInt(decimalsHex, 16);
        const supply = BigInt(supplyHex);
        const formatted = formatSupply(supply, decimals);
        const supplyHuman = Number(supply) / 10 ** decimals;

        let priceWld: number | null = ani?.current_price_num ?? null;
        let marketCapWld: number | null = ani?.market_cap_wld ?? null;

        // After graduation Ani uses pool price × total supply (same as wallet UI)
        if (ani?.graduated) {
          const poolPrice = await fetchPoolPriceWld().catch(() => null);
          if (poolPrice !== null && poolPrice > 0 && Number.isFinite(supplyHuman)) {
            priceWld = poolPrice;
            marketCapWld = poolPrice * supplyHuman;
          }
        }

        const priceUsd =
          priceWld !== null && wldUsd !== null ? priceWld * wldUsd : null;

        if (!cancelled) {
          setInfo({
            chainId: 480,
            chain: "World Chain",
            symbol: "WHOAMI",
            decimals,
            supply: formatted.short,
            supplyRaw: formatted.full,
            holders:
              holders === null ? FALLBACK.holders : holders.toLocaleString("en-US"),
            holdersRaw: holders ?? 0,
            price: priceUsd === null ? FALLBACK.price : formatUsd(priceUsd),
            priceUsd,
            marketCap:
              marketCapWld === null
                ? FALLBACK.marketCap
                : formatMarketCapWld(marketCapWld),
            marketCapWld,
            loading: false,
            error: false,
          });
        }
      } catch {
        if (!cancelled) {
          setInfo({ ...FALLBACK, loading: false, error: true });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return info;
}
