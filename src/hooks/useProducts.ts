import { IGetProduct, IResponse } from "../Interfaces/service";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "src/services/products";

export const useProducts = (params: IGetProduct): IResponse => {
    const { data, isLoading, error } = useQuery(["PRODUCTS", params], async () => {
        const res = await getProducts(params);

        return res;
    });

    return { data, isLoading, error };
};
