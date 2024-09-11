import { useEffect, useState } from 'react';

import { ConfigProvider, Modal } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

import { fetchTopCoinsData } from '../../redux/actions/get-coins-asynk-thunk';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { ModalShopping, PopularCoin } from './components';

import styles from './header.module.scss';

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
              <PopularCoin coinName={coin.name} coinPrice={coin.priceUsd} key={`${coin.id}-${index}`} />
            ))}
          </div>
        </div>

        <div className={styles.shoppingContainer} onClick={() => setIsModalOpen(true)}>
          <ShoppingOutlined className={styles.soppingCartIcon} />
          <div className={styles.shoppingCart}>
            <h3>Итого</h3>
            <h2>134,32 USD</h2>
            <div className={styles.shoppingCartStatistic}>
              <span>+2,38</span>
              <span>(1,80 %)</span>
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
          open={isModalOpen}
          centered={true}
          footer={null}
          width="75%"
          onCancel={() => setIsModalOpen(false)}>
          <ModalShopping />
        </Modal>
      </ConfigProvider>
    </>
  );
};
