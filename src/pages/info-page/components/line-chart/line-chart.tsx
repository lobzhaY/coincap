import { useEffect, useState } from "react";

import { VictoryArea, VictoryAxis, VictoryChart } from "victory";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchHistoryData } from "../../../../redux/actions/get-coins-asynk-thunk";

import {
  createRechartsObj,
  tickFormatX,
  tickFormatY,
} from "../../utils/line-chart";

type LineRechartsProps = {
  coinId: string;
};

type DataRechartType = {
  name: string;
  price: string;
};

export const LineRecharts: React.FC<LineRechartsProps> = ({ coinId }) => {
  const [dataRecharts, setDataRecharts] = useState<DataRechartType[]>([]);
  const { historyCoin } = useAppSelector((state) => state.coins);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHistoryData({ id: coinId, interval: "d1" }));
  }, [dispatch, coinId]);

  useEffect(() => {
    if (coinId) {
      setDataRecharts(createRechartsObj(historyCoin));
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

          <VictoryAxis tickFormat={tickFormatX} />

          <VictoryAxis dependentAxis tickFormat={tickFormatY} />
        </VictoryChart>
      )}
    </div>
  );
};
