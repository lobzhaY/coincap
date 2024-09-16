import { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { ConfigProvider, Table } from 'antd';

import { OneCoinType } from '../../../../types';

import styles from './item-table.module.scss';
import { getChangePercentColor } from '../../../../utils/get-colors';
import { addDollarSign, addProcentSign, formatNums, formatToBillion, formatToMillion } from '../../../../utils/format-nums';

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

  const createTableObj = useCallback((dataObj: OneCoinType) => {

    const objKeys = Object.keys(dataObj).filter(
      (elem) =>
        elem !== 'id' &&
        elem !== 'rank' &&
        elem !== 'symbol' &&
        elem !== 'name' &&
        elem !== 'marketCapUsd' &&
        elem !== 'priceUsd'
    );
 
    const dataVal = objKeys.map((elem) => {
      return {
        id: elem,
        key: switchTableKey(elem),
        value: switchSing(elem, dataObj),
      };
    });

    const dataTableVal = [
      {
        id: 'priceUsd',
        key: 'Price',
        value: addDollarSign(formatNums(dataObj.priceUsd)),
      },
      ...dataVal,
    ];

    setDataTable(dataTableVal);
  }, []);

  useEffect(() => {
    if (dataCoin) {
      createTableObj(dataCoin);
    }
  }, [dataCoin, createTableObj]);

  const switchTableKey = (key: string) => {
    let stringKey = '';
    switch (key) {
      case 'supply':
        stringKey = 'Available supply for trading';
        break;
      case 'maxSupply':
        stringKey = 'Total quantity of asset issued';
        break;
      case 'volumeUsd24Hr':
        stringKey = 'Quantity of trading volume over the last 24h';
        break;
      case 'changePercent24Hr':
        stringKey = 'The direction and value change in the last 24h';
        break;
      case 'vwap24Hr':
        stringKey = 'Volume Weighted Average Price in the last 24h';
        break;
      case 'explorer':
        stringKey = 'Explorer';
        break;
      default:
        stringKey = key;
    }
    return stringKey;
  };

  const switchSing = (key: string, dataObj) => {
    let stringValue = '';
    switch (key) {
      case 'supply':
        stringValue = addDollarSign(formatToMillion(dataObj[key]));
        break;
      case 'maxSupply':
        stringValue = addDollarSign(formatToMillion(dataObj[key]));
        break;
      case 'volumeUsd24Hr':
        stringValue = addDollarSign(formatToBillion(dataObj[key]));
        break;
      case 'changePercent24Hr':
        stringValue = addProcentSign(formatNums(dataObj[key]));
        break;
      case 'vwap24Hr':
        stringValue =addDollarSign(formatNums(dataObj[key]));
        break;
      case 'explorer':
        stringValue = dataObj[key];
        break;
      default:
        stringValue = dataObj[key];
    }
    return stringValue;
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
      </ConfigProvider>
    </div>
  );
};
