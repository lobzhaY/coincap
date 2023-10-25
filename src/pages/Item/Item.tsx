import { Col, Row, Typography, Input, Button, Table } from "antd";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { LeftSquareOutlined } from "@ant-design/icons";

import styles from "./Item.module.css";

interface DataType {
    key: string;
    value: string;
}

const data: DataType[] = [
    {
        key: "Price",
        value: "23162.22 $",
    },
    {
        key: "Available offer for trading",
        value: "19.3 млн",
    },
    {
        key: "Total number of assets issued",
        value: "21.0 млн",
    },
    {
        key: "Trading volume over the last 24 hours",
        value: "14.3 млрд",
    },
    {
        key: "Average price by volume over the last 24 hours",
        value: "22828.25 $",
    },
    {
        key: "Percentage change in price over the last 24 hours",
        value: "2.02 %",
    },
    {
        key: "22828.25 $",
        value: "https://bitcoin.org/ru/",
    },
];

const dataRecharts = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

function ItemCurrency() {
    const { Title } = Typography;
    const { Column } = Table;
    return (
        <div>
            <Row align="middle" justify="center">
                <Col span={8} className={styles.title_container}>
                    <span className={styles.item_span}>BTC</span>
                    <Title level={2} className={styles.item_title}>
                        Bitcoin
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
                        <Button type="primary" className={styles.modal_button}>
                            Add
                        </Button>
                    </Row>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={10}>
                    <Table dataSource={data} pagination={false}>
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
                    <AreaChart
                        width={500}
                        height={275}
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
                        <Area
                            type="monotone"
                            dataKey="uv"
                            stroke="#8884d8"
                            fill="#8884d8"
                        />
                    </AreaChart>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Button type="primary" className={styles.modal_button}>
                    <LeftSquareOutlined /> Back
                </Button>
            </Row>
        </div>
    );
}

export default ItemCurrency;
