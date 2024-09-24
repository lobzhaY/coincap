import { ShoppingOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { openModal } from "../../../../redux/slices/app-slice";

import { withModal } from "../../../../hoc/with-modal";

import { addProcentSign, formatNums } from "../../../../utils/format-nums";
import {
  getPresentTotalDiff,
  getPriceDiff,
} from "../../../../utils/get-total-price";

import { MODAL } from "../../../../constants/modal";

import styles from "./cart.module.scss";

const CartComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalCartPrice, totalPriceDiff } = useAppSelector(
    (state) => state.shoppingCart
  );

  return (
    <div
      className={styles.shoppingContainer}
      onClick={() => dispatch(openModal(MODAL.cart))}
    >
      <ShoppingOutlined className={styles.soppingCartIcon} />
      <div className={styles.shoppingCart}>
        <h3>Итого</h3>
        <h2>{formatNums(`${totalCartPrice}`) || 0} USD</h2>
        <div className={styles.shoppingCartStatistic}>
          <span>
            {getPriceDiff(totalCartPrice, totalPriceDiff) > 0
              ? "+" +
                formatNums(`${getPriceDiff(totalCartPrice, totalPriceDiff)}`)
              : formatNums(`${getPriceDiff(totalCartPrice, totalPriceDiff)}`)}
          </span>
          <span>
            (
            {addProcentSign(
              formatNums(
                `${getPresentTotalDiff(totalCartPrice, totalPriceDiff)}`
              )
            )}
            )
          </span>
        </div>
      </div>
    </div>
  );
};

export const Cart = withModal(CartComponent);
