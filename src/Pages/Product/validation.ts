import * as Yup from "yup";

export const productSchema = Yup.object().shape({
    name: Yup.string().required("Trường bắt buộc !"),
    code: Yup.string().required("Trường bắt buộc !"),
    price: Yup.number().required("Trường bắt buộc !"),
    description: Yup.string(),
});

export const productOptionSchema = Yup.object().shape({
    size: Yup.string().required("Trường bắt buộc !"),
    color: Yup.string().required("Trường bắt buộc !"),
    quantity: Yup.number().required("Trường bắt buộc !"),
    image: Yup.mixed()
        .required("Trường bắt buộc !")
        .test("image-extension", "Các đuôi file cho phép: .png, .jpg", (value) => {
            const extensionFile = value?.name?.split(".")?.slice(-1)?.pop() || "";

            return ["jpg", "png"].includes(extensionFile);
        }),
});
