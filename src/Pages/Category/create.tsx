import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { IModal } from "src/Interfaces/component";
import { RcFile } from "antd/lib/upload";
import { createSchema } from "./validation";

export const ModalCreateCategory = ({ isModalVisible, handleCancel }: IModal) => {
    const formik = useFormik({
        initialValues: {
            categoryName: "",
            categoryImage: "",
        },
        validationSchema: createSchema,
        onSubmit: (value) => {
            console.log(value);
        },
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
            title="Thêm mới loại sản phẩm"
            visible={isModalVisible}
            onOk={() => formik.handleSubmit()}
            onCancel={handleCancel}
            okText="Đồng ý"
            cancelText="Đóng"
        >
            <Form colon={false} labelAlign="left" {...formItemLayout}>
                <Form.Item
                    label="Loại sản phẩm"
                    name="categoryName"
                    help={formik.errors.categoryName}
                    validateStatus={formik.errors.categoryName ? "error" : "success"}
                >
                    <Input onChange={(e) => formik.setFieldValue("categoryName", e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="categoryImage"
                    label="Ảnh"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    help={formik.errors.categoryImage}
                    validateStatus={formik.errors.categoryImage ? "error" : "success"}
                >
                    <Upload
                        name="logo"
                        listType="picture"
                        beforeUpload={beforeUpload}
                        onChange={(e) => formik.setFieldValue("categoryImage", e.fileList[0])}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};
