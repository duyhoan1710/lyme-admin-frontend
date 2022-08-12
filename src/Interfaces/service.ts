export interface IPaginate {
    page?: number;
    perPage?: number;
}

export interface IResponse {
    data: {
        message: string;
        result: any[];
        paging: {
            page: string;
            perPage: string;
            total: number;
        };
    };
    isLoading: boolean;
    error: any;
}

// CATEGORY
export interface IGetCategory extends IPaginate {
    name?: string;
}

export interface IPostCategory {
    name: string;
    image?: File;
}

export interface IPutCategory {
    id: number;
    name: string;
    image?: File;
}

export interface IDeleteCategory {
    id?: number;
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
