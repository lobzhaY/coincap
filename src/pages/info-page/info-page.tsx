import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button, ConfigProvider } from "antd";
import { LeftSquareOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchActiveCoinData } from "../../redux/actions/get-coins-async-thunk";

import {
  CoinWidget,
  QuantityForm,
  ItemTable,
  LineRecharts,
} from "./components";

import styles from "./info-page.module.scss";
import { Cap, Loader } from "../../components";
import { themeInfoPage } from "../../styles/config-provider";

const InfoPage: React.FC = () => {
  const { activeCoin } = useAppSelector((state) => state.coins);
  const { isLoading } = useAppSelector((state) => state.app);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchActiveCoinData(id));
    }
  }, [id, dispatch]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      {!isLoading ? (
        activeCoin && id ? (
          <div className={styles.itemContainer}>
            <CoinWidget
              coinName={activeCoin.name}
              coinSymbol={activeCoin.symbol}
            />

            <QuantityForm
              idCoin={id}
              price={activeCoin.priceUsd}
              name={activeCoin.name}
            />

            <div className={styles.dataContainer}>
              <ItemTable dataCoin={activeCoin} />
              <LineRecharts coinId={id} />
            </div>

            <ConfigProvider theme={themeInfoPage}>
              <Button
                type='primary'
                className={styles.buttonContainer}
                onClick={handleGoBack}
              >
                <div className={styles.button}>
                  <LeftSquareOutlined className={styles.icon} />
                  <span>Back</span>
                </div>
              </Button>
            </ConfigProvider>
          </div>
        ) : (
          <Cap />
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default InfoPage;
