import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ClientOnly } from "remix-utils/client-only";
import { CoinChart } from "~/components/CoinChart";

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClientOnly fallback={null}>{() => <CoinChart />}</ClientOnly>
    </div>
  );
}
