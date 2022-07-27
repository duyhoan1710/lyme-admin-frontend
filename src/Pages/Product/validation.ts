import * as Yup from "yup";

export const productSchema = Yup.object().shape({
    name: Yup.string().required("Trường bắt buộc !"),
    code: Yup.string().required("Trường bắt buộc !"),
    price: Yup.number().required("Trường bắt buộc !"),
    categoryId: Yup.number().required("Trường bắt buộc !"),
    discount: Yup.number(),
    description: Yup.string(),
});

export const productOptionSchema = Yup.object().shape({
    size: Yup.string().required("Trường bắt buộc !"),
    color: Yup.string().required("Trường bắt buộc !"),
    quantity: Yup.number().required("Trường bắt buộc !"),
    image: Yup.mixed()
        .test("image-required", "Trường bắt buộc !", (images: File[]) => {
            if (!images || !images.length) return false;

            return true;
        })
        .test("image-extension", "Các đuôi file cho phép: .png, .jpg", (images: File[]) => {
            if (!images) return true;

            for (const image of images) {
                const extensionFile = image?.name?.split(".")?.slice(-1)?.pop() || "";

                if (!["jpg", "png"].includes(extensionFile)) {
                    return false;
                }
            }
            return true;
        }),
});
