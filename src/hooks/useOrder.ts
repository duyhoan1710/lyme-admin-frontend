import { IGetOrder, IResponse } from "./../Interfaces/service";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../services/order";

export const useOrder = (params: IGetOrder): IResponse => {
    const { data, isLoading, error } = useQuery(["ORDER", params], async () => {
        const res = await getOrder(params);
        return res;
    });

    return { data, isLoading, error };
};
