import { ShoppingOutlined } from '@ant-design/icons';

import { PopularCoin } from './popular-coin';

import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.popularCoinContainer}>
        <h3>Популярные криптовалюты</h3>
        <div className={styles.coinList}>
          <PopularCoin />
          <PopularCoin />
          <PopularCoin />
        </div>
      </div>

      <div className={styles.shoppingContainer}>
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
  );
};
