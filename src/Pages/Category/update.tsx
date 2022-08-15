import { Button, Form, Image, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { IModal } from "src/Interfaces/component";
import { RcFile } from "antd/lib/upload";
import { createCategorySchema } from "./validation";
import { updateCategory } from "src/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ICategory extends IModal {
    data: {
        id: number;
        name: string;
        image: string;
    };
}
export const ModalUpdateCategory = ({ isModalVisible, handleCancel, data }: ICategory) => {
    const queryClient = useQueryClient();

    const { mutate: handleUpdateCategory } = useMutation(
        async () => {
            await updateCategory({ ...formik.values, id: data.id });
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["CATEGORIES"]);
                handleCancel();
            },
            onError: () => {
                console.log("error");
            },
        }
    );

    const formik = useFormik({
        initialValues: {
            name: data.name,
            image: undefined,
        },
        validationSchema: createCategorySchema,
        onSubmit: () => handleUpdateCategory(),
    });

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file: RcFile) => {
        return false;
    };

    return (
        <Modal
            title="Sửa loại sản phẩm"
            visible={isModalVisible}
            onOk={() => formik.handleSubmit()}
            onCancel={handleCancel}
            okText="Đồng ý"
            cancelText="Đóng"
        >
            <Form colon={false} labelAlign="left" {...formItemLayout}>
                <Form.Item
                    label="Loại sản phẩm"
                    name="name"
                    help={formik.errors.name}
                    validateStatus={formik.errors.name ? "error" : "success"}
                    initialValue={formik.values.name}
                >
                    <Input onChange={(e) => formik.setFieldValue("name", e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Ảnh"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    help={formik.errors.image}
                    validateStatus={formik.errors.image ? "error" : "success"}
                >
                    <Upload
                        name="logo"
                        listType="picture"
                        beforeUpload={beforeUpload}
                        onChange={(e) => formik.setFieldValue("image", e.fileList[0])}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>

                    {!formik.values.image && data.image && <Image src={formik.values.image} />}
                </Form.Item>
            </Form>
        </Modal>
    );
};
