import { ConfigProvider, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './item-table.module.scss';

export const ItemTable: React.FC = ({ dataCoin }) => {
  const { Column } = Table;

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (dataCoin) {
      createTableObj(dataCoin);
    }
  }, [dataCoin]);

  const switchTableKey = (key: string) => {
    let stringKey = "";
    switch (key) {
        case "supply":
            stringKey = "Available supply for trading";
            break;
        case "maxSupply":
            stringKey = "Total quantity of asset issued";
            break;
        case "volumeUsd24Hr":
            stringKey = "Quantity of trading volume over the last 24h";
            break;
        case "changePercent24Hr":
            stringKey = "The direction and value change in the last 24h";
            break;
        case "vwap24Hr":
            stringKey = "Volume Weighted Average Price in the last 24h";
            break;
        case "explorer":
            stringKey = "Explorer";
            break;
        default:
            stringKey = key;
    }
    return stringKey;
};

  function createTableObj(dataObj) {
    const objKeys = Object.keys(dataObj).filter(
        elem =>
            elem !== "id" &&
            elem !== "rank" &&
            elem !== "symbol" &&
            elem !== "name" &&
            elem !== "marketCapUsd" &&
            elem !== "priceUsd"
    );
    const dataVal = objKeys.map(elem => {
        return {
            key: switchTableKey(elem),
            value: dataObj[elem]
        };
    });
    const dataTableVal = [
        {
            key: "Price",
            value: `${Number(dataObj.priceUsd).toFixed(2)} $`,
        },
        ...dataVal,
    ];
    setDataTable(dataTableVal);
}

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
              <Link to={text}> {dataCoin.name}</Link>
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
