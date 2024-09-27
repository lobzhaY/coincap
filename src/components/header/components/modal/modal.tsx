import { useAppSelector } from '../../../../hooks';

import { TableCart } from './table';

import { formatBySign, formatNums } from '../../../../utils';
import { FORMAT_NUMS_SIGN } from '../../../../constants/modal';
import { MODAL_BRIEFCASE_TEXT } from '../../../../constants/text';

import styles from './modal.module.scss';

export const ModalShopping: React.FC = () => {
  const { totalCartPrice } = useAppSelector(state => state.shoppingCart);

  return (
    <div className={styles.modalTable}>
      <h2 className={styles.modalTitle}>{MODAL_BRIEFCASE_TEXT.briefcase}</h2>

      <div className={styles.shoppingCart}>
        <TableCart />

        <div className={styles.summary}>
          <p>{MODAL_BRIEFCASE_TEXT.total}:</p>
          <span> {formatBySign(formatNums(`${totalCartPrice}`) || '0', FORMAT_NUMS_SIGN.DOLLAR)}</span>
        </div>
      </div>
    </div>
  );
};
