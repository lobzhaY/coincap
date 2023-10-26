import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Input, Button, Table } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { LeftSquareOutlined } from "@ant-design/icons";

import styles from "./Item.module.css";
import {
    useGetHistoryCoincapQuery,
    useGetOneCoincapQuery,
} from "../../redux/coincap";
import IResponseItem from "../../types/responseItem";

interface DataType {
    key: string;
    value: string;
}
interface DataRechartType {
    name: string;
    uv: string;
}

interface HistoryResponse {
    date: string;
    priceUsd: string;
    time: number;
}

function ItemCurrency() {
    const { Title } = Typography;
    const { Column } = Table;
    const [dataTable, setDataTable] = useState<DataType[]>([]);
    const [dataRecharts, setDataRecharts] = useState<DataRechartType[]>([]);
    const { currencyId } = useParams();
    const { data = [], isLoading } = useGetOneCoincapQuery(currencyId);
    const { data: recharts = [] } = useGetHistoryCoincapQuery({
        id: currencyId,
        interval: "d1",
    });
    function createTableObj(dataObj: IResponseItem) {
        const obj = Object.entries(dataObj);
        const dataTableVal = obj.map(elem => {
            return {
                key: elem[0],
                value: elem[1],
            };
        });
        setDataTable(dataTableVal);
    }
    function createRechartsObj(rechartsObj: HistoryResponse[]) {
        const arrTenDays = rechartsObj.slice(-10);
        const arr = arrTenDays.map(elem => {
            return {
                name: elem.date,
                uv: elem.priceUsd,
            };
        });
        setDataRecharts(arr);
    }
    useEffect(() => {
        if (data.data) {
            createTableObj(data.data);
        }
    }, [data]);
    useEffect(() => {
        if (recharts.data) {
            createRechartsObj(recharts.data);
        }
    }, [recharts.data]);

    return (
        <div>
            {isLoading ? (
                <p>Loading</p>
            ) : (
                <>
                    <Row align="middle" justify="center">
                        <Col span={8} className={styles.title_container}>
                            <span className={styles.item_span}>
                                {data.data.symbol}
                            </span>
                            <Title level={2} className={styles.item_title}>
                                {data.data.name}
                            </Title>
                        </Col>
                    </Row>
                    <Row align="middle" justify="center">
                        <Col span={10}>
                            <Title level={5} className={styles.item_enter}>
                                Enter quantity:
                            </Title>
                            <Input
                                placeholder="Quantity"
                                className={styles.modal_input}
                            />
                            <Row align="middle" justify="center">
                                <Button
                                    type="primary"
                                    className={styles.modal_button}>
                                    Add
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row align="middle" justify="center">
                        <Col span={10}>
                            <Table dataSource={dataTable} pagination={false}>
                                <Column
                                    title={() => <p>Information</p>}
                                    dataIndex="key"
                                    key="key"
                                    className={styles.table_field}
                                />
                                <Column
                                    title={() => <p>Currency data</p>}
                                    dataIndex="value"
                                    key="value"
                                    className={styles.table_field}
                                />
                            </Table>
                        </Col>
                        <Col span={10}>
                            <div style={{ width: "100%" }}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart
                                        width={500}
                                        height={200}
                                        data={dataRecharts}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="uv"
                                            stroke="#8884d8"
                                            fill="#8884d8"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                    </Row>
                    <Row align="middle" justify="center">
                        <Button type="primary" className={styles.modal_button}>
                            <LeftSquareOutlined /> Back
                        </Button>
                    </Row>{" "}
                </>
            )}
        </div>
    );
}

export default ItemCurrency;
