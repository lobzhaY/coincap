import styles from './coin-widget.module.scss';

type CoinWidgetProps = {
  coinName: string, coinSymbol: string
}

export const CoinWidget: React.FC<CoinWidgetProps> = ({coinName, coinSymbol}) => {
  return (
    <div className={styles.widgetWrapper}>
      <div className={styles.widgetContainer}>
        <span>{coinSymbol}</span>
      </div>
      <h1>{coinName}</h1>
    </div>
  );
};
