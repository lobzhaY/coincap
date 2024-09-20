import { useEffect, useState } from "react";

import { VictoryArea, VictoryAxis, VictoryChart } from "victory";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchHistoryData } from "../../../../redux/actions/get-coins-asynk-thunk";

import { HistoryCoinType } from "../../../../types/coin.__types__";

type DataRechartType = {
  name: string;
  price: string;
};

type LineRechartsProps = {
  coinId: string;
};

export const LineRecharts: React.FC<LineRechartsProps> = ({ coinId }) => {
  const [dataRecharts, setDataRecharts] = useState<DataRechartType[]>([]);
  const { historyCoin } = useAppSelector((state) => state.coins);
  const dispatch = useAppDispatch();

  function createRechartsObj(rechartsObj: HistoryCoinType[]) {
    const arrTenDays = rechartsObj.slice(-30);
    const arr = arrTenDays.map((elem) => {
      const objDate = new Date(elem.date);
      return {
        name: `${objDate.getDate()}.${
          objDate.getMonth() + 1
        }.${objDate.getFullYear()}`,
        price: Number(elem.priceUsd).toFixed(2),
      };
    });
    setDataRecharts(arr);
  }

  useEffect(() => {
    dispatch(fetchHistoryData({ id: coinId, interval: "d1" }));
  }, [dispatch, coinId]);

  useEffect(() => {
    if (coinId) {
      createRechartsObj(historyCoin);
    }
  }, [historyCoin, coinId]);

  return (
    <div style={{ width: "100%" }}>
      {dataRecharts.length > 0 && (
        <VictoryChart width={700} height={200}>
          <VictoryArea
            style={{ data: { fill: "#AE0A8A" } }}
            data={dataRecharts}
            x='name'
            y='price'
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            interpolation='natural'
          />

          <VictoryAxis
            tickFormat={(t, index) => {
              const tickStep = 5;
              if (index % tickStep === 0) {
                return t;
              }
              return "";
            }}
          />

          <VictoryAxis
            dependentAxis
            tickFormat={(tick, index, ticks) => {
              if (index === 0 || tick !== ticks[index - 1]) {
                return tick;
              }
              return "";
            }}
          />
        </VictoryChart>
      )}
    </div>
  );
};
