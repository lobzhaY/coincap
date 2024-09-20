import { useEffect } from 'react';

import { ConfigProvider, Modal } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

import { fetchTopCoinsData } from '../../redux/actions/get-coins-asynk-thunk';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { ModalShopping, PopularCoin } from './components';

import styles from './header.module.scss';
import { addProcentSign, formatNums } from '../../utils/format-nums';
import { getPresentTotalDiff, getPriceDiff } from '../../utils/get-total-price';
import { closeModal, openModal } from '../../redux/slices/app-slice';

export const Header: React.FC = () => {
  const { headerCoin } = useAppSelector((state) => state.coins);
  const { totalCartPrice, totalPriceDiff } = useAppSelector((state) => state.shoppingCart);
  const { isOpenModal } = useAppSelector((state) => state.app);

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
              <PopularCoin coinName={coin.name} coinPrice={coin.priceUsd} key={`${coin.id}-${index}`} />
            ))}
          </div>
        </div>

        <div className={styles.shoppingContainer} onClick={() => dispatch(openModal())}>
          <ShoppingOutlined className={styles.soppingCartIcon} />
          <div className={styles.shoppingCart}>
            <h3>Итого</h3>
            <h2>{formatNums(`${totalCartPrice}`) || 0} USD</h2>
            <div className={styles.shoppingCartStatistic}>
              <span>{getPriceDiff(totalCartPrice, totalPriceDiff) > 0 ? '+' + formatNums(`${getPriceDiff(totalCartPrice, totalPriceDiff)}`) : formatNums(`${getPriceDiff(totalCartPrice, totalPriceDiff)}`)}</span>
              <span>({addProcentSign(formatNums(`${getPresentTotalDiff(totalCartPrice, totalPriceDiff)}`))})</span>
            </div>
          </div>
        </div>
      </header>

      <ConfigProvider
        theme={{
          token: {
            borderRadiusLG: 1,
          },
        }}>
        <Modal
          open={isOpenModal}
          centered={true}
          footer={null}
          width="75%"
          onCancel={() => dispatch(closeModal())}>
          <ModalShopping />
        </Modal>
      </ConfigProvider>
    </>
  );
};
