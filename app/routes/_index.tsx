import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ClientOnly } from "remix-utils/client-only";
import { CoinChart } from "~/components/CoinChart";

export default function Index() {
  const WS_URL = "wss://wspap.okx.com:8443/ws/v5/public";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log("Connection state changed");
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      });
    }
  }, [readyState]);

  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`);
  }, [lastJsonMessage]);
  return (
    <div className="flex h-screen items-center justify-center">
      <ClientOnly fallback={null}>{() => <CoinChart />}</ClientOnly>
    </div>
  );
}
