import { Button, ConfigProvider, InputNumber, InputNumberProps } from 'antd';

import styles from './quantity-form.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addCoinToCart, addCoinWithSelection } from '../../../../redux/slices/shopping-cart';

type QuantityFormProps = {
  idCoin: string
}

export const QuantityForm: React.FC<QuantityFormProps> = ({idCoin}) => {
  const dispatch = useDispatch();

  const [coinQuantity, setCoinQuantity] = useState<number>();

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value, typeof value);
    if (value && typeof value === 'number') {
      setCoinQuantity(value);
    }
  };

  const handleAddCoin = () => {
    console.log(coinQuantity)
    if (coinQuantity && coinQuantity > 0) {
      dispatch(addCoinWithSelection({id: idCoin, quantity: coinQuantity}));
      setCoinQuantity(undefined);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Введите количество</h2>
      <div className={styles.formContainer}>
        <ConfigProvider
          theme={{
            components: {
              InputNumber: {
                hoverBorderColor: '#AE0A8A',
                activeBorderColor: '#EF880D',
              },
            },
          }}>
          <InputNumber className={styles.input} controls={false} onChange={onChange} value={coinQuantity}/>
        </ConfigProvider>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultActiveBorderColor: 'EF880D',
                defaultColor: '#EF880D',
                defaultActiveColor: '#EF880D',
                defaultBorderColor: '#EF880D',
                defaultHoverBorderColor: '#AE0A8A',
                defaultHoverColor: '#AE0A8A',
              },
            },
          }}>
          <Button size={'small'} className={styles.button} onClick={handleAddCoin}>
            <span>Купить</span>
          </Button>
        </ConfigProvider>
      </div>
    </div>
  );
};
