import { ConfigProvider, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './item-table.module.scss';

export const ItemTable: React.FC = ({ data }) => {
  const { Column } = Table;

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (data) {
      setDataTable(data);
    }
  }, [data]);

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
      <Table dataSource={dataTable} pagination={false}>
        <Column
          title={() => <p>Information</p>}
          dataIndex="key"
          key="key"
        />
        <Column
          title={() => <p>Currency data</p>}
          dataIndex="value"
          key="value"
          render={(text, rowIndex) => {
            return rowIndex.key === 'Explorer' ? (
              <Link to={text}>link {/* {data.data.name} */}</Link>
            ) : (
              <div>{text}</div>
            );
          }}
          onCell={(record) => {
            return {
              style: {
                color: 'green', //getColor(record),
                fontWeight: record.key === 'Price' ? 'bold' : '',
              },
            };
          }}
        />
      </Table>
      </ConfigProvider>
    </div>
  );
};
