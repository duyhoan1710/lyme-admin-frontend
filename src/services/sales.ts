import { IDeleteSale, IGetSales, IPostSale, IPutSale } from "./../Interfaces/service";
import axiosClient from "src/Api/axiosClient";

export const getSales = async (params: IGetSales) => {
    const res = await axiosClient.get("/sales", { params });

    return res.data;
};

export const createSale = async (params: IPostSale) => {
    const res = await axiosClient.post("/sales", params);

    return res.data;
};

export const updateSale = async (params: IPutSale) => {
    const res = await axiosClient.put(`/sales/${params.id}`, params);

    return res.data;
};

export const deleteSale = async (params: IDeleteSale) => {
    const res = await axiosClient.delete(`/sales/${params.id}`);

    return res.data;
};
