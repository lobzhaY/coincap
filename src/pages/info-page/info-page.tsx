import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Button, ConfigProvider } from "antd";
import { LeftSquareOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchActiveCoinData } from "../../redux/actions/get-coins-asynk-thunk";

import {
  CoinWidget,
  QuantityForm,
  ItemTable,
  LineRecharts,
} from "./components";

import styles from "./info-page.module.scss";
import { Loader } from "../../components";

const InfoPage: React.FC = () => {
  const { activeCoin } = useAppSelector((state) => state.coins);
  const { isLoading } = useAppSelector((state) => state.app);
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchActiveCoinData(id));
    }
  }, [id, dispatch]);

  return (
    <>
      {!isLoading && activeCoin && id ? (
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

          <Link to='/'>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#EF880D",
                  colorPrimaryHover: "#AE0A8A",
                },
              }}
            >
              <Button type='primary' className={styles.buttonContainer}>
                <div className={styles.button}>
                  <LeftSquareOutlined className={styles.icon} />
                  <span>Back</span>
                </div>
              </Button>
            </ConfigProvider>
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default InfoPage;
