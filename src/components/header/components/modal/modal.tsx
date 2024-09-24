import { useAppSelector } from '../../../../hooks';

import { TableCart } from './table';

import { formatBySign, formatNums } from '../../../../utils';
import { FORMAT_NUMS } from '../../../../constants/modal';

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
          <span> {formatBySign(formatNums(`${totalCartPrice}`) || '0', FORMAT_NUMS.DOLLAR)}</span>
        </div>
      </div>
    </div>
  );
};
