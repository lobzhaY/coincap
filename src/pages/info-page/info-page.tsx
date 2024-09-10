import { Link, useParams } from 'react-router-dom';
import { QuantityForm } from './quantity-form';
import { Button, ConfigProvider } from 'antd';
import { LeftSquareOutlined } from '@ant-design/icons';

import styles from './info-page.module.scss';
import { LineRecharts } from './line-chart';
import { dataTable } from '../main-page/table/dataTable';
import { ItemTable } from './item-table';
import { CoinWidget } from './coin-widget';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect, useState } from 'react';
import { fetchActiveCoinData } from '../../redux/actions/get-coins';

export const InfoPage: React.FC = () => {
  const { coins, activeCoin } = useSelector((state) => state.coins);
  let { id } = useParams();
  const [dataCoin, setDataCoin] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(fetchActiveCoinData(id)); 
  }, [id]);

  return (
    <>
      {' '}
      {activeCoin ? (
        <div className={styles.itemContainer}>
          <CoinWidget coinName={activeCoin.name} coinSymbol={activeCoin.symbol} />

          <QuantityForm />

          <div className={styles.dataContainer}>
            <ItemTable dataCoin={activeCoin} />
            <LineRecharts coinId={id} />
          </div>

          <Link to="/">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#EF880D',
                  colorPrimaryHover: '#AE0A8A',
                },
              }}>
              <Button type="primary" className={styles.buttonContainer}>
                <div className={styles.button}>
                  <LeftSquareOutlined className={styles.icon} />
                  <span>Back</span>
                </div>
              </Button>
            </ConfigProvider>
          </Link>
        </div>
      ) : (<p>Loading</p>)}
    </>
  );
};
