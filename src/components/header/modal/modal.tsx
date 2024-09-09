import styles from './modal.module.scss';
import { TableCart } from './table';

export const ModalShopping = () => {
  return (
    <div className={styles.modalTable}>
      <h2 className={styles.modalTitle}>Портфель</h2>

      <div className={styles.shoppingCart}>
        <TableCart />

        <div className={styles.summary}>
          <p>Итого:</p>
          <span>1623.265 $</span>
        </div>
      </div>
    </div>
  );
};
