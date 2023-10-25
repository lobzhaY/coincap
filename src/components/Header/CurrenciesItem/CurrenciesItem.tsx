import { Col, Row, Typography } from "antd";
import styles from "./CurrenciesItem.module.css";

function CurrenciesItem() {
    const { Title } = Typography;

    return (
        <Col span={8}>
            <Row>
                <Title level={4} className={styles.item_title}>
                    Bitcoin
                </Title>
            </Row>
            <Row>
                <p>
                    23162.22<span>$</span>
                </p>
            </Row>
        </Col>
    );
}

export default CurrenciesItem;
