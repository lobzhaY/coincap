import { useEffect } from "react";

import { fetchTopCoinsData } from "../../redux/actions/get-coins-asynk-thunk";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { Cart, PopularCoin } from "./components";

import styles from "./header.module.scss";

export const Header: React.FC = () => {
  const { headerCoin } = useAppSelector((state) => state.coins);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopCoinsData(3));
  }, [dispatch]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.popularCoinContainer}>
          <h3>Популярные криптовалюты</h3>
          <div className={styles.coinList}>
            {headerCoin.map((coin, index) => (
              <PopularCoin
                coinName={coin.name}
                coinPrice={coin.priceUsd}
                key={`${coin.id}-${index}`}
              />
            ))}
          </div>
        </div>

        <Cart />
      </header>
    </>
  );
};
