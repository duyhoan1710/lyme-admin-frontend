import { Modal } from "antd";
import { IModal } from "src/Interfaces/component";

export const ModalConfirm = ({
    isModalVisible,
    handleCancel,
    handleOk,
    title,
    children,
}: IModal) => {
    return (
        <Modal
            title={title}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Đồng ý"
            cancelText="Đóng"
        >
            {children}
        </Modal>
    );
};
