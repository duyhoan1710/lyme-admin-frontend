import * as Yup from "yup";
export const createEvaluationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Trường bắt buộc !"),
    categoryImage: Yup.mixed()
        .required("Trường bắt buộc !")
        .test("image-extension", "Các đuôi file cho phép: .png, .jpg", (value) => {
            const extensionFile = value?.name?.split(".")?.slice(-1)?.pop() || "";

            return ["jpg", "png"].includes(extensionFile);
        }),
});
