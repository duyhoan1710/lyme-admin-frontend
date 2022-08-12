import * as Yup from "yup";
export const saleSchema = Yup.object().shape({
    name: Yup.string().required("Trường bắt buộc !"),
    startTime: Yup.string().required("Trường bắt buộc !"),
    endTime: Yup.string().required("Trường bắt buộc !"),
    description: Yup.string().required("Trường bắt buộc !"),
});
