import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ConfigProvider, Modal, Table } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import { useAppSelector } from '../../../../hooks';

import { ModalTable } from '../modal';

import { OneCoinType } from '../../../../types';

import styles from './table.module.scss';

export const DataTable: React.FC = () => {
  const { Column } = Table;

  const navigate = useNavigate();

  const handleRowClick = (currencyId: string): void => {
    navigate(`/${currencyId}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idCoin, setIdCoin] = useState<{idCoin: string, name: string}>();
  const { coins } = useAppSelector((state) => state.coins);
  const [dataTable, setDataTable] = useState<OneCoinType[]>();

  useEffect(() => {
    setDataTable(coins);
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
                    console.log(record);
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
                    color: Number(record.changePercent24Hr.slice(0, -2)) < 0 ? 'red' : 'green',
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
                    console.log(record);
                    setIdCoin({idCoin: record.id, name: record.name});
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
            setIdCoin({idCoin: '', name: ''})
            }}>
          <ModalTable coin={idCoin} />
        </Modal>
      </ConfigProvider>
    </>
  );
};