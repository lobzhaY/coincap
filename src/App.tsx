import { Suspense, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { ConfigProvider } from "antd";

import { useAppDispatch, useAppSelector } from "./hooks";

import { Header, Loader } from "./components";

import theme from "./styles/config-provider";
import styles from "./App.module.scss";
import { fetchData } from "./redux/actions/get-coins-asynk-thunk";
import { CoinType, addCoinToCart, compareTotalPrice, synhronizeCoinsPrice } from "./redux/slices/shopping-cart";
import { getTotalPrice } from "./utils/get-total-price";

function App() {
  const { isError } = useAppSelector((state) => state.app);
  const { cart } = useAppSelector((state) => state.shoppingCart);
  const { allCoins } = useAppSelector((state) => state.coins);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      navigate("/404", { replace: true });
    }
  }, [isError, navigate]);

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

  return (
    <div className={styles.root}>
      <ConfigProvider
          theme={theme}
        >
      <Suspense fallback={<Loader />}>
        <Header />
        <div>
          <Outlet />
        </div>
      </Suspense>
      </ConfigProvider>
    </div>
  );
}

export default App;
