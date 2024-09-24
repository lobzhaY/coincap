import { QUANTITY_FORM_TEXT } from "../../../../constants/text";
import { useAppSelector } from "../../../../hooks";
import { selectCoinById } from "../../../../redux/selectors/selector";

import { QuantityForm } from "../../../info-page/components";

import styles from "./modal.module.scss";

export const ModalTable: React.FC = () => {
  const { modalPayload: coinId } = useAppSelector((state) => state.app);
  const coin = useAppSelector((state) => selectCoinById(coinId)(state));

  return (
    <div className={styles.modalTable}>
      <h2 className={styles.modalTitle}>
        {QUANTITY_FORM_TEXT.buy} <span>{coin?.name}</span>
      </h2>
      <QuantityForm
        idCoin={coinId}
        price={coin?.priceUsd as string}
        name={coin?.name as string}
      />
    </div>
  );
};
