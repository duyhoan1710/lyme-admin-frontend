import * as Yup from "yup";
export const createCategorySchema = Yup.object().shape({
    name: Yup.string().required("Trường bắt buộc !"),
    // image: Yup.mixed()
    //     .required("Trường bắt buộc !")
    //     .test("image-extension", "Các đuôi file cho phép: .png, .jpg", (value) => {
    //         const extensionFile = value?.name?.split(".")?.slice(-1)?.pop() || "";

    //         return ["jpg", "png"].includes(extensionFile);
    //     }),
});
