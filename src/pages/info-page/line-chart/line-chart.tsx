import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchHistoryData } from '../../../redux/actions/get-coins';

type DataRechartType = {
  name: string;
  price: string;
};

interface HistoryResponse {
  date: string;
  priceUsd: string;
  time: number;
}

export const LineRecharts: React.FC = ({ coinId }) => {
  const [dataRecharts, setDataRecharts] = useState<DataRechartType[]>([]);
  const dispatch = useDispatch();
  const { historyCoin } = useSelector((state) => state.coins)

  function createRechartsObj(rechartsObj: HistoryResponse[]) {
    const arrTenDays = rechartsObj.slice(-30);
    const arr = arrTenDays.map((elem) => {
      const objDate = new Date(elem.date);
      return {
        name: `${objDate.getDate()}.${objDate.getMonth() + 1}.${objDate.getFullYear()}`,
        price: Number(elem.priceUsd).toFixed(2),
      };
    });
    setDataRecharts(arr);
  };

  useEffect(() => {
    dispatch(fetchHistoryData({id: coinId, interval: 'd1'}));
  }, []);

  useEffect(() => {
    if (coinId) {
     createRechartsObj(historyCoin);
    }
  }, [historyCoin]);

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={dataRecharts}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
