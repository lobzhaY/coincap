import { useEffect, useState } from "react";

import { Table } from "antd";

import { createTableObj } from "../../utils/line-chart";
import { getStyleById, showLink } from "./utils/table";

import { OneCoinType } from "../../../../types";

import styles from "./item-table.module.scss";

type ItemTableProps = {
  dataCoin: OneCoinType;
};

export type DataTableType = {
  id: string;
  key: string;
  value: string;
};

export const ItemTable: React.FC<ItemTableProps> = ({ dataCoin }) => {
  const { Column } = Table;

  const [dataTable, setDataTable] = useState<DataTableType[]>([]);

  useEffect(() => {
    if (dataCoin) {
      setDataTable(createTableObj(dataCoin));
    }
  }, [dataCoin]);

  return (
    <div className={styles.tableContainer}>
      <Table dataSource={dataTable} pagination={false} rowKey='key'>
        <Column title={() => <p>Information</p>} dataIndex='key' key='key' />
        <Column
          title={() => <p>Currency data</p>}
          dataIndex='value'
          key='value'
          render={(text: string, rowIndex: DataTableType) =>
            showLink(text, rowIndex, dataCoin.name)
          }
          onCell={(record) => getStyleById(record)}
        />
      </Table>
    </div>
  );
};
