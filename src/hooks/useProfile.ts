import { useQuery } from "@tanstack/react-query";
import { IResponse } from "@interfaces";
import { getProfile } from "src/services/profile";
export const useProfile = (): IResponse => {
    const { data, isLoading, error } = useQuery(["PROFILE"], async () => {
        const res = await getProfile();
        return res.data;
    });

    return { data, isLoading, error };
};
