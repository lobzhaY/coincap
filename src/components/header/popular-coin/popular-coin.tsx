import styles from './popular-coin.module.scss';

export const PopularCoin: React.FC = () => {
  return (
    <div className={styles.coinWrapper}>
      <h4>Bitcoin</h4>
      <p>23162.06<span>$</span></p>
    </div>
  )
}