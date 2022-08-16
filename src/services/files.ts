import axiosClient from "src/Api/axiosClient";

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post("/upload-file", formData);
    return res.data;
};
