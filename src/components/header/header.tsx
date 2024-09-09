import { ShoppingOutlined } from '@ant-design/icons';

import { PopularCoin } from './popular-coin';

import styles from './header.module.scss';
import { useState } from 'react';
import { ConfigProvider, Modal } from 'antd';
import { ModalShopping } from './modal';

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.popularCoinContainer}>
          <h3>Популярные криптовалюты</h3>
          <div className={styles.coinList}>
            <PopularCoin />
            <PopularCoin />
            <PopularCoin />
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
          width='75%'
          onCancel={() => setIsModalOpen(false)}>
          <ModalShopping />
        </Modal>
      </ConfigProvider>
    </>
  );
};
