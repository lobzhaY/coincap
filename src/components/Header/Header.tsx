import { useEffect, useState } from "react";
import { Flex, Col, Row, Typography } from "antd";
import CurrenciesItem from "./CurrenciesItem/CurrenciesItem";
import { useGetCoincapQuery } from "../../redux/coincap";
import IResponseItem from "../../types/responseItem";
import styles from "./Header.module.css";

function Header() {
    const { Title } = Typography;
    const { data = [], isLoading } = useGetCoincapQuery();
    const [three, setThree] = useState([]);
    useEffect(() => {
        if (data.data) {
            const firstThree = data.data.slice(0, 3);
            setThree(firstThree);
        }
    }, [data]);

    return (
        <header className={styles.header__container}>
            <Flex
                gap="middle"
                justify="space-between"
                align="center"
                className={styles.header}>
                <div className={styles.header_currencies}>
                    <Row>
                        <Col span={24}>
                            <Title
                                level={5}
                                className={styles.header_currencies_title}>
                                Popular cryptocurrencies:
                            </Title>
                        </Col>
                    </Row>
                    <Row>
                        {isLoading ? (
                            <p>LOADING</p>
                        ) : (
                            three.map((elem: IResponseItem) => (
                                <CurrenciesItem
                                    elemName={elem.name}
                                    elemPrice={elem.priceUsd}
                                    key={elem.id}
                                />
                            ))
                        )}
                    </Row>
                </div>
                <div className={styles.header_total}>
                    <Row>
                        <Col span={8}>
                            <span
                                className={`material-symbols-outlined ${styles.total_icon}`}>
                                business_center
                            </span>
                        </Col>
                        <Col span={16}>
                            <Row>
                                <Col span={24}>
                                    <Title
                                        level={4}
                                        className={styles.total_title}>
                                        Total:
                                    </Title>
                                </Col>
                            </Row>
                            <Row className={styles.total_price}>
                                <Col span={12}>1617.24</Col>
                                <Col span={12}>USD</Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Flex>
        </header>
    );
}

export default Header;
