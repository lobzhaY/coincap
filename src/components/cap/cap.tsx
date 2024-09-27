import capSrc from '../../assets/cap.png';
import styles from './cap.module.scss';

export const Cap: React.FC = () => {
  return (
    <div className={styles.cap}>
      <h1>No data</h1>
      <div>
        <img src={capSrc} alt="No data" />
      </div>
    </div>
  );
};
