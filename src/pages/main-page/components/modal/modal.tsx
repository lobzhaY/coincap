import { QuantityForm } from '../../../info-page/components';

import styles from './modal.module.scss';

type ModalTableProps = {
  coin: {
    idCoin: string,
    name: string,
    price: string,
  } | undefined
}

export const ModalTable: React.FC<ModalTableProps> = ({coin}) => {
  return (
    <div className={styles.modalTable}>
      <h2 className={styles.modalTitle}>
        Купить <span>{coin?.name}</span>
      </h2>
      <QuantityForm idCoin={coin?.idCoin as string} price={coin?.price as string} />
    </div>
  );
};
