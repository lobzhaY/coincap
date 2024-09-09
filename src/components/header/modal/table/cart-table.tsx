import { ConfigProvider, Table } from "antd";
import styles from './cart-table.module.scss';
import { dataTable } from "../../../../pages/main-page/table/dataTable";
import { CloseSquareOutlined } from "@ant-design/icons";

export const TableCart: React.FC = () => {
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
          <Table dataSource={dataTable} pagination={false} size={'middle'}>
            <Column
              title={() => <p className={styles.columnTitle}>Название</p>}
              dataIndex="name"
              key="name"
              className={styles.tableField}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Цена</p>}
              dataIndex="price"
              key="price"
              className={styles.tableField}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Кол-во</p>}
              dataIndex="quantity"
              key="quantity"
              className={styles.tableField}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Итого</p>}
              dataIndex="priceAll"
              key="priceAll"
              className={`${styles.tableField} ${styles.tableWeight}`}
            />

            <Column
              render={() => <CloseSquareOutlined className={styles.tableIcon} />}
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