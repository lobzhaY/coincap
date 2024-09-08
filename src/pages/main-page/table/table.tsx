import { ConfigProvider, Table } from "antd";

import styles from './table.module.scss';

import { dataTable } from "./dataTable";
import { PlusSquareOutlined } from "@ant-design/icons";

export const DataTable: React.FC = () => {
  const { Column } = Table;
  return (
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
            <Table
                dataSource={dataTable}
                pagination={false}
                size={"middle"}>
                <Column
                    title={() => <p className={styles.columnTitle}>№</p>}
                    dataIndex="rank"
                    key="rank"
                    className={styles.tableField}
                />
                <Column
                    dataIndex="symbol"
                    key="symbol"
                    className={styles.tableFieldColor}
                />
                <Column
                    title={() => <p className={styles.columnTitle}>Name</p>}
                    dataIndex="name"
                    key="name"
                    className={`${styles.tableField} ${styles.tableAlign} ${styles.tableWeight}`}
                    onCell={(record) => {
                        return {
                            onClick: () => {
                               console.log(record);
                            },
                        };
                    }}
                />
                <Column
                    title={() => (
                        <p className={styles.columnTitle}>VWAP(24Hr)</p>
                    )}
                    dataIndex="vwap24Hr"
                    key="vwap24Hr"
                    className={styles.tableField}
                />
                <Column
                    title={() => (
                        <p className={styles.columnTitle}>Change(24Hr)</p>
                    )}
                    dataIndex="changePercent24Hr"
                    key="changePercent24Hr"
                    onCell={(record) => {
                        return {
                            style: {
                                color:
                                    Number(
                                        record.changePercent24Hr.slice(0, -2)
                                    ) < 0
                                        ? "red"
                                        : "green",
                            },
                        };
                    }}
                    className={`${styles.tableField}`}
                />
                <Column
                    title={() => (
                        <p className={styles.columnTitle}>Market Cap</p>
                    )}
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
                    render={() => (
                        <PlusSquareOutlined className={styles.tableIcon} />
                    )}
                    onCell={(record) => {
                        return {
                            onClick: () => {
                                console.log(record);
                            },
                        };
                    }}
                />
            </Table>
            </ConfigProvider>
        </div>
  )
}