"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/brand";

const RPC = "https://worldchain.drpc.org";
/** Uniswap V3 WHOAMI/WLD — token0=WLD, token1=WHOAMI */
const POOL_WHOAMI_WLD = "0xe211785c5ecd160612ee8277abed4aa01c0548a4";
/** Uniswap V3 USDC.e/WLD — token0=WLD, token1=USDC.e (6 decimals) */
const POOL_USDC_WLD = "0xc19bc89ac024426f5a23c5bb8bc91d8017c90684";
const TOKEN_API = `https://worldchain-mainnet.explorer.alchemy.com/api/v2/tokens/${LINKS.contract}`;

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
  loading: false,
  error: false,
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

/** token1_raw / token0_raw from Uniswap V3 slot0 */
function ratioFromSlot0(slot0Hex: string): number {
  const sqrtPriceX96 = BigInt(slot0Hex.slice(0, 66));
  const Q96 = 2n ** 96n;
  const scale = 10n ** 18n;
  return Number((sqrtPriceX96 * sqrtPriceX96 * scale) / (Q96 * Q96)) / 1e18;
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

/**
 * Price purely on-chain (CORS-safe RPC):
 * WHOAMI/WLD pool + WLD/USDC.e pool → WHOAMI USD
 */
async function fetchWhoamiPriceUsd(): Promise<number> {
  const [whoamiSlot, usdcSlot] = await Promise.all([
    ethCall(POOL_WHOAMI_WLD, SLOT0_SIG),
    ethCall(POOL_USDC_WLD, SLOT0_SIG),
  ]);

  // token0=WLD(18), token1=WHOAMI(18) → WHOAMI_raw/WLD_raw
  const whoamiPerWld = ratioFromSlot0(whoamiSlot);
  const wldPerWhoami = 1 / whoamiPerWld;

  // token0=WLD(18), token1=USDC.e(6) → USDC_raw/WLD_raw
  // human USDC per WLD = rawRatio * 10^(18-6)
  const usdcRawPerWldRaw = ratioFromSlot0(usdcSlot);
  const wldUsd = usdcRawPerWldRaw * 10 ** 12;

  return wldPerWhoami * wldUsd;
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
        const [supplyHex, decimalsHex, holders, priceUsd] = await Promise.all([
          ethCall(LINKS.contract, TOTAL_SUPPLY_SIG),
          ethCall(LINKS.contract, DECIMALS_SIG),
          fetchHolders().catch(() => null),
          fetchWhoamiPriceUsd().catch(() => null),
        ]);
        const decimals = Number.parseInt(decimalsHex, 16);
        const supply = BigInt(supplyHex);
        const formatted = formatSupply(supply, decimals);
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
