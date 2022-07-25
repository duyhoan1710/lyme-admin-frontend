export interface IPaginate {
    page?: number;
    perPage?: number;
}

export interface IGetCategory extends IPaginate {
    categoryName?: string;
}

export interface IPostCategory {
    categoryName: string;
    categoryImage: File;
}

export interface IPutCategory {
    id: number;
    categoryName: string;
    categoryImage: File;
}

export interface IDeleteCategory {
    id: number;
}
