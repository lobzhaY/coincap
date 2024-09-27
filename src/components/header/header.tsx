import { HEADER_TEXT } from '../../constants/text';
import { useAppSelector } from '../../hooks';

import { Cart, PopularCoin } from './components';

import styles from './header.module.scss';

export const Header: React.FC = () => {
  const { headerCoin } = useAppSelector(state => state.coins);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.popularCoinContainer}>
          <h3>{HEADER_TEXT.popularCoins}</h3>
          <div className={styles.coinList}>
            {headerCoin.map((coin, index) => (
              <PopularCoin coinName={coin.name} coinPrice={coin.priceUsd} key={`${coin.id}-${index}`} />
            ))}
          </div>
        </div>

        <Cart />
      </header>
    </>
  );
};
