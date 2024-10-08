import { FORMAT_NUMS_SIGN } from '../../../../constants/modal';
import { formatBySign, formatNums } from '../../../../utils';
import styles from './popular-coin.module.scss';

type PopularCoinProps = {
  coinName: string;
  coinPrice: string;
};

export const PopularCoin: React.FC<PopularCoinProps> = ({ coinName, coinPrice }) => {
  return (
    <div className={styles.coinWrapper}>
      <h4>{coinName}</h4>
      <p>{formatBySign(formatNums(coinPrice), FORMAT_NUMS_SIGN.DOLLAR)}</p>
    </div>
  );
};
