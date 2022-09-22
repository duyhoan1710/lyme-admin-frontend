import { IGetRooms, IGetUsers } from "./../Interfaces/service";
import axiosClient from "src/Api/axiosClient";

export const getUsers = async (params: IGetUsers) => {
    const res = await axiosClient.get("/users", { params });

    return res.data;
};

export const getRooms = async (params: IGetRooms) => {
    const res = await axiosClient.get("/rooms", { params });

    return res.data;
};
