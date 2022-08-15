import { IGetCategory, IResponse } from "./../Interfaces/service";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "src/services/category";

export const useCategory = (params: IGetCategory): IResponse => {
    const { data, isLoading, error } = useQuery(["CATEGORIES", params], async () => {
        const res = await getCategory(params);
        return res;
    });

    return { data, isLoading, error };
};
