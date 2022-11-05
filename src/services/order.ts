import {
  IDeleteOrder,
  IGetOrder,
  IPostOrder,
  IPutOrder,
} from "./../Interfaces/service";
import axiosClient from "../Api/axiosClient";

export const getOrder = async (params: IGetOrder) => {
  const res = await axiosClient.get("/orders", { params });

  return res.data;
};


export const updateOrder = async (params: IPutOrder) => {
  const res = await axiosClient.put(`/orders/${params.id}`, params);

  return res.data;
};

export const deleteOrder = async (params: IDeleteOrder) => {
  const res = await axiosClient.delete(`/orders/${params.id}`);

  return res.data;
};
