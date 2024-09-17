import { ConfigProvider, Table } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";

import styles from "./cart-table.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { useEffect, useState } from "react";
import { CoinType, deleteCoinFromCart } from "../../../../../redux/slices/shopping-cart";
import { addDollarSign, formatNums } from "../../../../../utils/format-nums";

type DataTable = {
  id: string;
  name: string;
  price: string;
  totalPrice: string;
};

export const TableCart: React.FC = () => {
  const { Column } = Table;
  const [dataTable, setDataTable] = useState<DataTable[]>();
  const { cart } = useAppSelector((state) => state.shoppingCart);
  const dispatch = useAppDispatch();

  const transformDataTable = (cart: CoinType[]): DataTable[] => {
    return cart.map((coin) => {
      return {
        ...coin,
        price: addDollarSign(formatNums(coin.price)),
        totalPrice: addDollarSign(formatNums(`${coin.totalPrice}`)),
      };
    });
  };

  useEffect(() => {
    setDataTable(transformDataTable(cart));
  }, [cart]);

  return (
    <>
      {!dataTable || dataTable.length === 0 ? (
        <p>Add some coins first</p>
      ) : (
        <div className={styles.tableContainer}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#AE0A8A",
                borderRadius: 1,
                fontFamily: '"Roboto", sans-serif',
              },
              components: {
                Table: {
                  borderColor: "#fad0f1",
                  headerBg: "#eee0e0",
                  headerBorderRadius: 1,
                },
              },
            }}
          >
            <Table
              dataSource={dataTable}
              pagination={false}
              size={"middle"}
              rowKey='id'
            >
              <Column
                title={() => <p className={styles.columnTitle}>Название</p>}
                dataIndex='name'
                key='name'
                className={styles.tableField}
              />
              <Column
                title={() => <p className={styles.columnTitle}>Цена</p>}
                dataIndex='price'
                key='price'
                className={styles.tableField}
              />
              <Column
                title={() => <p className={styles.columnTitle}>Кол-во</p>}
                dataIndex='quantity'
                key='quantity'
                className={styles.tableField}
              />
              <Column
                title={() => <p className={styles.columnTitle}>Итого</p>}
                dataIndex='totalPrice'
                key='totalPrice'
                className={`${styles.tableField} ${styles.tableWeight}`}
              />

              <Column
                render={() => (
                  <CloseSquareOutlined className={styles.tableIcon} />
                )}
                onCell={(record) => {
                  return {
                    onClick: () => {
                      dispatch(deleteCoinFromCart(record.id))
                    },
                  };
                }}
              />
            </Table>
          </ConfigProvider>
        </div>
      )}
    </>
  );
};
