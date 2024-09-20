import { useState } from "react";

import { Button, InputNumber, InputNumberProps } from "antd";

import { useAppDispatch } from "../../../../hooks";
import { addCoinToCart } from "../../../../redux/slices/shopping-cart";
import { closeModal } from "../../../../redux/slices/app-slice";

import { withMessage } from "../../../../hoc/with-message";

import { getAddSuccessMessage } from "../../../../utils/create-messages";

import styles from "./quantity-form.module.scss";


type QuantityFormProps = {
  idCoin: string;
  price: string;
  name: string;
  showSuccessMessage: (message: string) => void;
};

const QuantityFormComponent: React.FC<QuantityFormProps> = ({
  idCoin,
  price,
  name,
  showSuccessMessage,
}) => {
  const dispatch = useAppDispatch();

  const [coinQuantity, setCoinQuantity] = useState<number>();

  const onChange: InputNumberProps["onChange"] = (value) => {
    if (value && typeof value === "number") {
      setCoinQuantity(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddCoin();
    }
  };

  const handleAddCoin = () => {
    if (coinQuantity && coinQuantity > 0) {
      dispatch(
        addCoinToCart({
          id: idCoin,
          quantity: coinQuantity,
          price: price,
          name: name,
        })
      );
      showSuccessMessage(getAddSuccessMessage(idCoin));
      setCoinQuantity(undefined);
      dispatch(closeModal(null));
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Введите количество</h2>
      <div className={styles.formContainer}>
        <InputNumber
          className={styles.input}
          controls={false}
          onChange={onChange}
          value={coinQuantity}
          onKeyDown={handleKeyDown}
        />
        <Button
          size={"small"}
          className={styles.button}
          onClick={handleAddCoin}
        >
          <span>Купить</span>
        </Button>
      </div>
    </div>
  );
};

export const QuantityForm = withMessage(QuantityFormComponent);
