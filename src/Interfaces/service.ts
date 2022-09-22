import { ESaleType } from "@enums";

export interface IPaginate {
    page?: number;
    perPage?: number;
}

export interface IResponse {
    data: any;
    isLoading: boolean;
    error: any;
}

// CATEGORY
export interface IGetCategory extends IPaginate {
    name?: string;
}

export interface IPostCategory {
    name: string;
    image?: string;
}

export interface IPutCategory {
    id: number;
    name: string;
    image?: string;
}

export interface IDeleteCategory {
    id?: number;
}

export interface ICategory extends IPostCategory {
    id: number;
}

// SALES

export interface IGetSales extends IPaginate {
    name?: string;
}

export interface IPostSale {
    name: string;
    startTime: string;
    endTime: string;
    description: string;
}

export interface IPutSale extends IPostSale {
    id: number;
}

export interface IDeleteSale {
    id?: number;
}

export interface ISale extends IPostSale {
    id: number;
}

// PRODUCT

export interface IGetProduct extends IPaginate {
    filter?: {
        code?: string;
        categoryId?: string;
    };
    order?: {
        [x: string]: string;
    };
}

export interface ISubProduct {
    size: string;
    color: string;
    quantity?: number;
    images?: string[];
}
export interface IPostProduct {
    name: string;
    price?: number;
    code: string;
    categoryId: string;
    saleId: string;
    saleValue?: number;
    saleType: ESaleType;
    description: string;
    subProducts: ISubProduct[];
}

export interface IPutProduct extends IPostProduct {
    id: number;
}

export interface IDeleteProduct {
    id?: number;
}

export interface IProduct extends IPostProduct {
    id: number;
    countBuyers: number;
    countViewers: number;
    category: ICategory;
    saleProducts: {
        id: string;
        saleType: "cent" | "percent";
        value: number;
        sale: ISale;
    }[];
}

export interface IGetUsers extends IPaginate {
    keySearch?: string;
}

export interface IGetRooms extends IPaginate {
    name?: string;
}

export interface IUser {
    id: string;
    email: string;
    full_name: string;
}

export interface IRoom {
    id: string;
    name: string;
}

export interface IMessage {
    id?: string;
    content: string;
    room_id: string;
    sender_id: string;
}
