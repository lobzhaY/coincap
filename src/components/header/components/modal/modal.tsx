import { TableCart } from './table';

import styles from './modal.module.scss';

export const ModalShopping: React.FC = () => {
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
