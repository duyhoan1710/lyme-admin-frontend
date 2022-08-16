import {
  IDeleteProduct,
  IGetProduct,
  IPostProduct,
  IPutProduct,
} from "./../Interfaces/service";
import axiosClient from "src/Api/axiosClient";

export const getProducts = async (params: IGetProduct) => {
  const res = await axiosClient.get("/products", { params });

  return res.data;
};

export const createProduct = async (params: IPostProduct) => {
  const res = await axiosClient.post("/products", params);

  return res.data;
};

export const updateProduct = async (params: IPutProduct) => {
  const res = await axiosClient.put(`/products/${params.id}`, params);

  return res.data;
};

export const deleteProduct = async (params: IDeleteProduct) => {
  const res = await axiosClient.delete(`/products/${params.id}`);

  return res.data;
};
