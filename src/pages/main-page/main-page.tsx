import { useEffect } from "react";

import { DataTable, TablePagination } from "./components";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchData } from "../../redux/actions/get-coins-asynk-thunk";
import {
  CoinType,
  addCoinToCart,
  compareTotalPrice,
  synhronizeCoinsPrice,
} from "../../redux/slices/shopping-cart";
import { getTotalPrice } from "../../utils/get-total-price";
import { Cap, Loader } from "../../components";

const MainPage: React.FC = () => {
  const { cart } = useAppSelector((state) => state.shoppingCart);
  const { allCoins } = useAppSelector((state) => state.coins);
  const { isLoading } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

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
    <>
      {!isLoading ? (
        allCoins.length > 0 ? (
          <main>
            <DataTable />
            <TablePagination />
          </main>
        ) : (
          <Cap />
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MainPage;
