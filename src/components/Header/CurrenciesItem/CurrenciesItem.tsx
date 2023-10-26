import { Col, Row, Typography } from "antd";
import styles from "./CurrenciesItem.module.css";

interface ICurrenciesItem {
    elemName: string;
    elemPrice: string;
}

function CurrenciesItem({ elemName, elemPrice }: ICurrenciesItem) {
    const { Title } = Typography;

    return (
        <Col span={8}>
            <Row>
                <Title level={4} className={styles.item_title}>
                    {elemName}
                </Title>
            </Row>
            <Row>
                <p>
                    {Number(elemPrice).toFixed(2)}
                    <span>$</span>
                </p>
            </Row>
        </Col>
    );
}

export default CurrenciesItem;
