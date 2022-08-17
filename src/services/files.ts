import axiosClient from "src/Api/axiosClient";

export const uploadFile = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file: File) => {
        formData.append("files", file);
    });

    const res = await axiosClient.post("files/upload-file", formData);
    return res;
};
