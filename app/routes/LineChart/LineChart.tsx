"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

export const description = "A linear line chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
export function LineChartCom() {
  const data = useRef();
  const WS_URL = "wss://wspap.okx.com:8443/ws/v5/public";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );
  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed");
    console.log(JSON.parse(readyState));
    if (readyState) {
      sendJsonMessage({
        op: "subscribe",
        args: [
          {
            channel: "tickers",
            instId: "BTC-USD-SWAP",
          },
        ],
      });
    }
  }, [readyState]);
  // Run when a new WebSocket message is received (lastJsonMessage).
  let chartData;
  useEffect(() => {
    let chartData = [
      {
        month: 1,
        desktop: lastJsonMessage?.data && lastJsonMessage?.data[0]?.last,
      },
    ];
    console.log(chartData);
  }, [lastJsonMessage]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>BTC Bitcoin Price</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="green"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
