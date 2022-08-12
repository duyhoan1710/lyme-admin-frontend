import { IGetSales, IResponse } from "../Interfaces/service";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "src/services/sales";

export const useSales = (params: IGetSales): IResponse => {
    const { data, isLoading, error } = useQuery(["SALES", params], async () => {
        const res = await getSales(params);

        return res.data;
    });

    return { data, isLoading, error };
};
