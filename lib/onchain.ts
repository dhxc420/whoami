"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/brand";

const RPC = "https://worldchain.drpc.org";
const TOTAL_SUPPLY_SIG = "0x18160ddd";
const DECIMALS_SIG = "0x313ce567";

export type OnChainInfo = {
  chainId: number;
  chain: string;
  symbol: string;
  decimals: number;
  supply: string;
  supplyRaw: string;
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
  loading: false,
  error: false,
};

function formatSupply(raw: bigint, decimals: number): { short: string; full: string } {
  const base = 10n ** BigInt(decimals);
  const whole = raw / base;
  const full = whole.toLocaleString("en-US");
  if (whole >= 1_000_000_000n) {
    return { short: `${(Number(whole) / 1e9).toFixed(whole % 1_000_000_000n === 0n ? 0 : 1)}B`, full };
  }
  if (whole >= 1_000_000n) {
    return { short: `${(Number(whole) / 1e6).toFixed(whole % 1_000_000n === 0n ? 0 : 1)}M`, full };
  }
  return { short: full, full };
}

async function ethCall(data: string): Promise<string> {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [{ to: LINKS.contract, data }, "latest"],
    }),
  });
  const json = (await res.json()) as { result?: string; error?: unknown };
  if (!json.result) throw new Error("rpc failed");
  return json.result;
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
        const [supplyHex, decimalsHex] = await Promise.all([
          ethCall(TOTAL_SUPPLY_SIG),
          ethCall(DECIMALS_SIG),
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
