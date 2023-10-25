import { Outlet } from "react-router-dom";

import { Col, Row } from "antd";

import Header from "../../components/Header/Header";

function RootRoute() {
    return (
        <>
            <Row>
                <Col span={20}>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col span={22}>
                    <Outlet />
                </Col>
            </Row>
        </>
    );
}

export default RootRoute;
