export interface IModal {
    isModalVisible: boolean;
    handleCancel: () => void;
    handleOk?: () => void;
    title?: string;
    children?: JSX.Element | string;
}

export interface IProductOption {
    image: File | "";
    size: string;
    color: string;
    quantity: number | "";
    code: string | "";
}

export interface IProductOptionObject {
    [x: string]: IProductOption;
}

export interface IProductOptionObjectError {
    [x: string]: boolean;
}
