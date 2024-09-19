import React from "react";
import { ClientOnly } from "remix-utils/client-only";
import { LineChartCom } from "./LineChart";

const Page = () => {
  return <ClientOnly fallback={null}>{() => <LineChartCom />}</ClientOnly>;
};

export default Page;
