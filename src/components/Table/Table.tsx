import { useNavigate } from "react-router-dom";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Table } from "antd";
import styles from "./Table.module.css";
import IResponseItem from "../../types/responseItem";

interface ITableComponent {
    dataTen: IResponseItem[];
}

function TableComponent({ dataTen }: ITableComponent) {
    const { Column } = Table;
    const navigate = useNavigate();

    const handleRowClick = (record: IResponseItem) => {
        const currencyId = record.id;
        navigate(`/${currencyId}`);
    };

    return (
        <div className={styles.table_container}>
            <Table
                dataSource={dataTen}
                pagination={false}
                className={styles.table}
                onRow={record => {
                    return {
                        onClick: () => {
                            handleRowClick(record);
                        },
                        /* onDoubleClick: (event) => {}, // double click row
                      onContextMenu: (event) => {}, // right button click row
                      onMouseEnter: (event) => {}, // mouse enter row
                      onMouseLeave: (event) => {}, // mouse leave row */
                    };
                }}>
                <Column
                    title={() => <p className={styles.colum_title}>№</p>}
                    dataIndex="rank"
                    key="rank"
                    className={styles.table_field}
                />
                <Column
                    dataIndex="symbol"
                    key="symbol"
                    className={styles.table_field_color}
                />
                <Column
                    title={() => <p className={styles.colum_title}>Name</p>}
                    dataIndex="name"
                    key="name"
                    className={`${styles.table_field} ${styles.table_align}`}
                />
                <Column
                    title={() => (
                        <p className={styles.colum_title}>VWAP(24Hr)</p>
                    )}
                    dataIndex="vwap24Hr"
                    key="vwap24Hr"
                    className={styles.table_field}
                />
                <Column
                    title={() => (
                        <p className={styles.colum_title}>Change(24Hr)</p>
                    )}
                    dataIndex="changePercent24Hr"
                    key="changePercent24Hr"
                    className={styles.table_field}
                />
                <Column
                    title={() => (
                        <p className={styles.colum_title}>Market Cap</p>
                    )}
                    dataIndex="marketCapUsd"
                    key="marketCapUsd"
                    className={styles.table_field}
                />
                <Column
                    title={() => <p className={styles.colum_title}>Price</p>}
                    dataIndex="priceUsd"
                    key="priceUsd"
                    className={styles.table_field}
                />
                <Column
                    render={() => (
                        <PlusSquareOutlined className={styles.table_icon} />
                    )}
                />
            </Table>
        </div>
    );
}

export default TableComponent;
