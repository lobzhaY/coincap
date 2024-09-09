import styles from './coin-widget.module.scss';

export const CoinWidget: React.FC = () => {
  return (
    <div className={styles.widgetWrapper}>
      <div className={styles.widgetContainer}>
        <span>BTC</span>
      </div>
      <h1>Bitcoin</h1>
    </div>
  );
};
