// import { ClientOnly } from "remix-utils/client-only";
// import { CoinChart } from "~/components/CoinChart";
import { CSVCom } from "~/components/csv";
import Papa from "papaparse";
import { useEffect, useState } from "react";
export default function Index() {
  const [getData, setGetData] = useState("");
  const [tableData, setTableData] = useState("");
  const handlerCsv = (e: any) => {
    setGetData(e.target.files[0]);
  };
  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(getData, {
        complete: (result: any) => {
          setTableData(result);
        },
      });
    };
    fetchParseData();
  }, [getData]);
  return (
    <div className="flex h-screen items-center justify-center">
      <input type="file" onChange={handlerCsv} />
      <CSVCom tableData={tableData} />
    </div>
  );
}
