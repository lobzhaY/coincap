import { Modal } from "antd";

import { useAppDispatch, useAppSelector } from "../hooks";
import { closeModal, removeModalBuyPayload } from "../redux/slices/app-slice";

import { ModalTable } from "../pages/main-page/components/modal";
import { ModalShopping } from "../components/header/components";

import { MODAL } from "../constants/modal";

export const withModal = (WrappedComponent: React.FC) => {
  return () => {
    const { isOpenModal, typeModal } = useAppSelector((state) => state.app);
    const dispatch = useAppDispatch();

    return (
      <>
        <WrappedComponent />
        {typeModal === MODAL.buy ? (
            <Modal
              open={isOpenModal}
              centered={true}
              footer={null}
              onCancel={() => {
                dispatch(closeModal(null));
                dispatch(removeModalBuyPayload());
              }}
            >
              <ModalTable />
            </Modal>
        ) : (
            <Modal
              open={isOpenModal}
              centered={true}
              footer={null}
              width='75%'
              onCancel={() => dispatch(closeModal(null))}
            >
              <ModalShopping />
            </Modal>
        )}
      </>
    );
  };
};
