import { getRooms } from "./../services/chat";
import { IGetRooms, IGetUsers } from "./../Interfaces/service";
import { useQuery } from "@tanstack/react-query";
import { IResponse } from "@interfaces";
import { getUsers } from "src/services/chat";

export const useUsers = (params: IGetUsers): IResponse => {
    const { data, isLoading, error } = useQuery(["CHAT_USERS", params], async () => {
        const res = await getUsers(params);
        return res;
    });

    return { data, isLoading, error };
};

export const useRooms = (params: IGetRooms): IResponse => {
    const { data, isLoading, error } = useQuery(["CHAT_ROOMS", params], async () => {
        const res = await getRooms(params);
        return res;
    });

    return { data, isLoading, error };
};
