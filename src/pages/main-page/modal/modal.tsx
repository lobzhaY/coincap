import { QuantityForm } from '../../info-page/quantity-form';
import styles from './modal.module.scss';

export const ModalTable = () => {
  return (
    <div className={styles.modalTable}>
        <h2 className={styles.modalTitle}>Купить <span>Bitcoin</span></h2>
        <QuantityForm />
    </div>
  )
}