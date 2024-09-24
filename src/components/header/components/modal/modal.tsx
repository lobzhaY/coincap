import { useAppSelector } from '../../../../hooks';

import { TableCart } from './table';

import { addDollarSign, formatNums } from '../../../../utils/format-nums';

import styles from './modal.module.scss';

export const ModalShopping: React.FC = () => {
  const { totalCartPrice } = useAppSelector((state) => state.shoppingCart);

  return (
    <div className={styles.modalTable}>
      <h2 className={styles.modalTitle}>Портфель</h2>

      <div className={styles.shoppingCart}>
        <TableCart />

        <div className={styles.summary}>
          <p>Итого:</p>
          <span> {addDollarSign(formatNums(`${totalCartPrice}`) || '0')}</span>
        </div>
      </div>
    </div>
  );
};
