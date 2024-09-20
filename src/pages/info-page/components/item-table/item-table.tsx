import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Table } from 'antd';

import { getChangePercentColor } from '../../../../utils/get-colors';

import { createTableObj } from '../../utils/line-chart';

import { OneCoinType } from '../../../../types';

import styles from './item-table.module.scss';


type ItemTableProps = {
  dataCoin: OneCoinType;
};

type DataTableType = {
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
        <Table dataSource={dataTable} pagination={false} rowKey="key">
          <Column title={() => <p>Information</p>} dataIndex="key" key="key" />
          <Column
            title={() => <p>Currency data</p>}
            dataIndex="value"
            key="value"
            render={(text, rowIndex) => {
              return rowIndex.key === 'Explorer' ? (
                <Link to={text}> {dataCoin.name}</Link>
              ) : (
                <div>{text}</div>
              );
            }}
            onCell={(record) => {
              return {
                style: {
                  color: record.id == 'changePercent24Hr' ? getChangePercentColor(record.value) : '',
                  fontWeight: record.id == 'priceUsd' ? 'bold' : '',
                },
              };
            }
          }
          />
        </Table>
    </div>
  );
};
