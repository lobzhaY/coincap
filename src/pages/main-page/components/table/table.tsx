import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  openModal,
  saveModalBuyPayload,
} from "../../../../redux/slices/app-slice";

import { withModal } from "../../../../hoc/with-modal";

import { getChangePercentColor } from "../../../../utils/get-colors";
import { transformDataTable } from "./utils/transform-data";

import { MODAL } from "../../../../constants/modal";

import { OneCoinTableType } from "./types/types";

import styles from "./table.module.scss";

export const DataTableContainer: React.FC = () => {
  const { Column } = Table;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRowClick = (currencyId: string): void => {
    navigate(`/coins/${currencyId}`);
  };

  const { coins } = useAppSelector((state) => state.coins);
  const [dataTable, setDataTable] = useState<OneCoinTableType[]>();

  useEffect(() => {
    setDataTable(transformDataTable(coins));
  }, [coins]);

  return (
    <>
      <div className={styles.tableContainer}>
          <Table
            dataSource={dataTable}
            pagination={false}
            size={"middle"}
            rowKey='id'
          >
            <Column
              title={() => <p className={styles.columnTitle}>№</p>}
              dataIndex='rank'
              key='rank'
              className={styles.tableField}
            />
            <Column
              dataIndex='symbol'
              key='symbol'
              className={styles.tableFieldColor}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Name</p>}
              dataIndex='name'
              key='name'
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
              dataIndex='vwap24Hr'
              key='vwap24Hr'
              className={styles.tableField}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Change(24Hr)</p>}
              dataIndex='changePercent24Hr'
              key='changePercent24Hr'
              onCell={(record) => {
                return {
                  style: {
                    color: getChangePercentColor(record.changePercent24Hr),
                  },
                };
              }}
              className={`${styles.tableField}`}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Market Cap</p>}
              dataIndex='marketCapUsd'
              key='marketCapUsd'
              className={styles.tableField}
            />
            <Column
              title={() => <p className={styles.columnTitle}>Price</p>}
              dataIndex='priceUsd'
              key='priceUsd'
              className={`${styles.tableField} ${styles.tableWeight}`}
            />
            <Column
              render={() => <PlusSquareOutlined className={styles.tableIcon} />}
              key='action'
              onCell={(record) => {
                return {
                  onClick: () => {
                    dispatch(saveModalBuyPayload(record.id));
                    dispatch(openModal(MODAL.buy));
                  },
                };
              }}
            />
          </Table>
      </div>
    </>
  );
};

export const DataTable = withModal(DataTableContainer);
