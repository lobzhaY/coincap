import { useState } from "react";
import {
    Modal,
    Typography,
    Col,
    Row,
    Table /* , Input, Button  */,
} from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import styles from "./ModalWindow.module.css";

interface DataType {
    id: string;
    name: string;
    priceUsd: string;
    quantity: number;
    total: string;
}

const data: DataType[] = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        priceUsd: "6929.82",
        quantity: 1,
        total: "6929.82",
    },
];

function ModalWindow() {
    const { Title } = Typography;
    const { Column } = Table;
    const [open, setOpen] = useState(true);
    return (
        <Modal
            centered
            open={open}
            onCancel={() => setOpen(false)}
            footer={[]}
            width={1000}>
            <Row align="middle" justify="center" className={styles.modal_title}>
                <Col>
                    <Title level={2} className={styles.title}>
                        <span className={styles.title_span}>briefcase</span>
                    </Title>
                </Col>
            </Row>
            <Row align="middle" justify="center" className={styles.modal_title}>
                <Col span={20}>
                    <Table dataSource={data} pagination={false}>
                        <Column
                            title={() => (
                                <p className={styles.colum_title}>Name</p>
                            )}
                            dataIndex="name"
                            key="name"
                            className={styles.table_field}
                        />
                        <Column
                            title={() => (
                                <p className={styles.colum_title}>Price</p>
                            )}
                            dataIndex="priceUsd"
                            key="priceUsd"
                            className={styles.table_field}
                        />
                        <Column
                            title={() => (
                                <p className={styles.colum_title}>Quantity</p>
                            )}
                            dataIndex="quantity"
                            key="quantity"
                            className={styles.table_field}
                        />
                        <Column
                            title={() => (
                                <p className={styles.colum_title}>Total</p>
                            )}
                            dataIndex="total"
                            key="total"
                            className={styles.table_field}
                        />
                        <Column
                            render={() => (
                                <CloseSquareOutlined
                                    className={styles.table_icon}
                                />
                            )}
                        />
                    </Table>
                </Col>
            </Row>
            <Row align="middle" justify="center" className={styles.modal_title}>
                <Col>
                    <Title level={2} className={styles.title}>
                        Total:{" "}
                        <span className={styles.title_span}>1617.24$</span>
                    </Title>
                </Col>
            </Row>
            {/* <Row align="middle" justify="center" className={styles.modal_title}>
                <Col>
                    <Title level={2} className={styles.title}>
                        buy <span className={styles.title_span}>bitcoin</span>
                    </Title>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col>
                    <p className={styles.modal_paragraph}>Enter quantity:</p>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={10}>
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
            </Row> */}
        </Modal>
    );
}

export default ModalWindow;
