import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ConfigProvider, Modal, Table } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import { useAppSelector } from '../../../../hooks';

import { ModalTable } from '../modal';

import { OneCoinType } from '../../../../types';

import styles from './table.module.scss';
import { addDollarSign, formatNums, formatToBillion } from '../../../../utils/format-nums';
import { getChangePercentColor } from '../../../../utils/get-colors';

type OneCoinTableType = {
  changePercent24Hr: string; 
  id: string;
  marketCapUsd: string;
  name: string; 
  priceUsd: string; 
  rank: string; 
  symbol: string; 
  vwap24Hr: string;
}

export const DataTable: React.FC = () => {
  const { Column } = Table;

  const navigate = useNavigate();

  const handleRowClick = (currencyId: string): void => {
    navigate(`/${currencyId}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idCoin, setIdCoin] = useState<{idCoin: string, name: string, price: string}>();
  const { coins } = useAppSelector((state) => state.coins);
  const [dataTable, setDataTable] = useState<OneCoinTableType[]>();

  const transformDataTable = (coins: OneCoinType[]): OneCoinTableType[] => {
    return coins.map((coin) => ({
      changePercent24Hr: addDollarSign(formatNums(coin.changePercent24Hr)),
      id: coin.id,
      marketCapUsd: addDollarSign(formatToBillion(coin.marketCapUsd)),
      name: coin.name,
      priceUsd: addDollarSign(formatNums(coin.priceUsd)),
      rank: coin.rank,
      symbol: coin.symbol,
      vwap24Hr: addDollarSign(formatNums(coin.vwap24Hr)),
    }));
  }

  useEffect(() => {
    setDataTable(transformDataTable(coins));
  }, [coins]);

  return (
    <>
      <div className={styles.tableContainer}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#AE0A8A',
              borderRadius: 1,
              fontFamily: '"Roboto", sans-serif',
            },
            components: {
              Table: {
                borderColor: '#fad0f1',
                headerBg: '#eee0e0',
                headerBorderRadius: 1,
              },
            },
          }}>
          <Table dataSource={dataTable} pagination={false} size={'middle'} rowKey="id">
            <Column
              title={() => <p className={styles.columnTitle}>№</p>}
              dataIndex="rank"
              key="rank"
              className={styles.tableField}
            />
            <Column dataIndex="symbol" key="symbol" className={styles.tableFieldColor} />
            <Column
              title={() => <p className={styles.columnTitle}>Name</p>}
              dataIndex="name"
              key="name"
              className={`${styles.tableField} ${styles.tableAlign} ${styles.tableWeight}`}
              onCell={(record) => {
                return {
                  onClick: () => {
                    handleRowClick(record.id);
                  },
                };
              }}
            />
            <Column
              title={() => <p className={styles.columnTitle}>VWAP(24Hr)</p>}
              dataIndex="vwap24Hr"
              key="vwap24Hr"
              className={styles.tableField}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Change(24Hr)</p>}
              dataIndex="changePercent24Hr"
              key="changePercent24Hr"
              onCell={(record) => {
                return {
                  style: {
                    color: getChangePercentColor(record.changePercent24Hr) //Number(record.changePercent24Hr.slice(0, -2)) < 0 ? 'red' : 'green',
                  },
                };
              }}
              className={`${styles.tableField}`}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Market Cap</p>}
              dataIndex="marketCapUsd"
              key="marketCapUsd"
              className={styles.tableField}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Price</p>}
              dataIndex="priceUsd"
              key="priceUsd"
              className={`${styles.tableField} ${styles.tableWeight}`}
            />
            <Column
              render={() => <PlusSquareOutlined className={styles.tableIcon} />}
              key='action'
              onCell={(record) => {
                return {
                  onClick: () => {
                    setIdCoin({idCoin: record.id, name: record.name, price: record.priceUsd});
                    setIsModalOpen(true);
                  },
                };
              }}
            />
          </Table>
        </ConfigProvider>
      </div>

      <ConfigProvider
        theme={{
          token: {
            borderRadiusLG: 1,
          },
        }}>
        <Modal
          open={isModalOpen}
          centered={true}
          footer={null}
          onCancel={() => {
            setIsModalOpen(false);
            setIdCoin({idCoin: '', name: '', price: ''})
            }}>
          <ModalTable coin={idCoin} />
        </Modal>
      </ConfigProvider>
    </>
  );
};
