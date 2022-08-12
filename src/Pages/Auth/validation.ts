import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    username: Yup.string().required("Trường bắt buộc !"),
    password: Yup.string().required("Trường bắt buộc !"),
});
