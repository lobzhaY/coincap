import { Suspense, useCallback, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { ConfigProvider, notification } from "antd";

import { useAppDispatch, useAppSelector } from "./hooks";

import { Header, Loader } from "./components";

import theme from "./styles/config-provider";
import styles from "./App.module.scss";
import { fetchData } from "./redux/actions/get-coins-async-thunk";
import {
  CoinType,
  addCoinToCart,
  compareTotalPrice,
  synhronizeCoinsPrice,
} from "./redux/slices/shopping-cart";
import { getTotalPrice } from "./utils/get-total-price";

function App() {
  const { isNotFoundCoin, isError, errorMessage } = useAppSelector((state) => state.app);
  const { cart } = useAppSelector((state) => state.shoppingCart);
  const { allCoins } = useAppSelector((state) => state.coins);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNotFoundCoin) {
      navigate("/404", { replace: true });
    }
  }, [isNotFoundCoin, navigate]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const lsCart = localStorage.getItem("coincapCart");

    if (lsCart) {
      JSON.parse(lsCart).forEach((coin: CoinType) =>
        dispatch(addCoinToCart(coin))
      );
      dispatch(compareTotalPrice(getTotalPrice(JSON.parse(lsCart))));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("coincapCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (allCoins) {
      dispatch(synhronizeCoinsPrice(allCoins));
    }
  }, [allCoins, dispatch]);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = useCallback((description: string) => {
    api.open({
      message: 'Something went wrong',
      description: description,
      className: 'custom-class',
      style: {
        width: 600,
      },
    });
  }, [api]);

  useEffect(() => {
    if (isError) {
      openNotification(errorMessage)
    }
  }, [errorMessage, isError, openNotification])

  return (
    <div className={styles.root}>
      <ConfigProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <Header />
          <div>
            <Outlet />
          </div>
        </Suspense>
      </ConfigProvider>
      {contextHolder}
    </div>
  );
}

export default App;
