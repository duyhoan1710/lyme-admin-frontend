import axiosClient from "src/Api/axiosClient";

export const getProfile = async () => {
    const res = await axiosClient.get("/users/profile");

    return res.data;
};
