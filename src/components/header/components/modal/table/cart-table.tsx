import { useEffect, useState } from "react";

import { Table } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { CoinType, deleteCoinFromCart } from "../../../../../redux/slices/shopping-cart";

import { withMessage } from "../../../../../hoc/with-message";

import { addDollarSign, formatNums } from "../../../../../utils/format-nums";
import { getDeleteSuccessMessage } from "../../../../../utils/create-messages";

import styles from "./cart-table.module.scss";

type DataTable = {
  id: string;
  name: string;
  price: string;
  totalPrice: string;
};

type TableCartComponentProps = {
  showSuccessMessage: (message: string) => void;
}

const TableCartComponent: React.FC<TableCartComponentProps> = ({showSuccessMessage}) => {
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
        <p className={styles.cap}>Add some coins first</p>
      ) : (
        <div className={styles.tableContainer}>
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
                      showSuccessMessage(getDeleteSuccessMessage(record.id))
                    },
                  };
                }}
              />
            </Table>
        </div>
      )}
    </>
  );
};

export const TableCart = withMessage(TableCartComponent);
