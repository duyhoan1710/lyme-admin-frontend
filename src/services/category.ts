import {
    IDeleteCategory,
    IGetCategory,
    IPostCategory,
    IPutCategory,
} from "./../Interfaces/service";
import axiosClient from "src/Api/axiosClient";

export const getCategory = async (params: IGetCategory) => {
    const res = await axiosClient.get("/categories", { params });

    return res.data;
};

export const createCategory = async (params: IPostCategory) => {
    const formData = new FormData();

    formData.append("name", params.name);
    if (params.image) {
        formData.append("image", params.image);
    }

    const res = await axiosClient.post("/categories", formData);

    return res.data;
};

export const updateCategory = async (params: IPutCategory) => {
    const formData = new FormData();

    formData.append("categoryName", params.name);
    if (params.image) {
        formData.append("image", params.image);
    }

    const res = await axiosClient.post(`/categories/${params.id}`, formData);

    return res.data;
};

export const deleteCategory = async (params: IDeleteCategory) => {
    const res = await axiosClient.delete(`/categories/${params.id}`);

    return res.data;
};
