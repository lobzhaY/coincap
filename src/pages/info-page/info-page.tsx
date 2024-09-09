import { Link } from 'react-router-dom';
import { QuantityForm } from './quantity-form';
import { Button, ConfigProvider } from 'antd';
import { LeftSquareOutlined } from '@ant-design/icons';

import styles from './info-page.module.scss';
import { LineRecharts } from './line-chart';
import { dataTable } from '../main-page/table/dataTable';
import { ItemTable } from './item-table';
import { CoinWidget } from './coin-widget';

export const InfoPage: React.FC = () => {
  return (
    <div className={styles.itemContainer}>
      <CoinWidget />

      <QuantityForm />

      <div className={styles.dataContainer}>
        <ItemTable data={dataTable[0]} />
        <LineRecharts recharts={dataTable[0]} />
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
  );
};
