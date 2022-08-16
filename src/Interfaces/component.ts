import { ISubProduct } from "./service";

export interface IModal {
    isModalVisible: boolean;
    handleCancel: () => void;
    handleOk?: () => void;
    title?: string;
    children?: JSX.Element | string;
    data?: any;
}

export interface IProductOptionObject {
    [x: string]: ISubProduct;
}

export interface IProductOptionObjectError {
    [x: string]: boolean;
}
