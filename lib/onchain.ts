"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/brand";

const RPC = "https://worldchain.drpc.org";
const POOL = "0xe211785c5ecd160612ee8277abed4aa01c0548a4";
const TOKEN_API = `https://worldchain-mainnet.explorer.alchemy.com/api/v2/tokens/${LINKS.contract}`;
const WLD_PRICE_API =
  "https://app-backend.toolsforhumanity.com/public/v1/miniapps/prices?fiatCurrencies=USD&cryptoCurrencies=WLD";

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
  if (price >= 0.0001) return `$${price.toFixed(6)}`;
  return `$${price.toExponential(2)}`;
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

/** token0=WLD, token1=WHOAMI → WLD per WHOAMI from Uniswap V3 slot0 */
async function fetchWhoamiPriceUsd(): Promise<number> {
  const [slot0, wldRes] = await Promise.all([
    ethCall(POOL, SLOT0_SIG),
    fetch(WLD_PRICE_API),
  ]);

  const sqrtPriceX96 = BigInt(slot0.slice(0, 66));
  const Q96 = 2n ** 96n;
  const scale = 10n ** 18n;
  // token1/token0 = (sqrtPriceX96/Q96)^2 = WHOAMI per WLD
  const whoamiPerWldScaled = (sqrtPriceX96 * sqrtPriceX96 * scale) / (Q96 * Q96);
  const wldPerWhoami = Number(scale) / Number(whoamiPerWldScaled);

  const wldJson = (await wldRes.json()) as {
    result?: { prices?: { WLD?: { USD?: { amount?: string; decimals?: number } } } };
  };
  const usd = wldJson.result?.prices?.WLD?.USD;
  if (!usd?.amount || usd.decimals == null) throw new Error("wld price failed");
  const wldUsd = Number(usd.amount) / 10 ** usd.decimals;

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
