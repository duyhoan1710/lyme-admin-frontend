import { DatePicker, Form, Input, Modal } from "antd";
import { useFormik } from "formik";
import { IModal } from "src/Interfaces/component";
import { saleSchema } from "./validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISale } from "@interfaces";
import TextArea from "antd/lib/input/TextArea";
import { formatDate } from "src/Utils/dateTime";
import moment from 'moment';
import { updateSale } from "src/services/sales";
interface IModalSale extends IModal {
    data: ISale;
}

export const ModalUpdateSale = ({ isModalVisible, handleCancel, data }: IModalSale) => {
    const queryClient = useQueryClient();

    const { mutate: handleUpdateCategory } = useMutation(
        async () => {
            await updateSale({ ...formik.values, id: data.id });
            handleCancel();
        },
        {
            onSuccess: () => queryClient.invalidateQueries(["SALES"]),
            onError: () => {
                console.log("error");
            },
        }
    );

    const formik = useFormik({
        initialValues: {
            id: data.id,
            name: data.name,
            startTime: data.startTime,
            endTime: data.endTime,
            description: data.description,
        },
        validationSchema: saleSchema,
        onSubmit: () => handleUpdateCategory(),
    });

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    return (
        <Modal
            title="update đợt sale"
            visible={isModalVisible}
            onOk={() => formik.handleSubmit()}
            onCancel={handleCancel}
            okText="Đồng ý"
            cancelText="Đóng"
            width={720}
        >
            <Form colon={false} labelAlign="left" {...formItemLayout}>
                <Form.Item
                    label="Tên đợt sale"
                    name="name"
                    help={formik.errors.name}
                    validateStatus={formik.errors.name ? "error" : "success"}
                    initialValue={formik.values.name}
                >
                    <Input onChange={(e) => formik.setFieldValue("name", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Thời gian bắt đầu"
                    name="startTime"
                    help={formik.errors.startTime}
                    validateStatus={formik.errors.startTime ? "error" : "success"}
                    initialValue={moment(formik.values.startTime)}
                >
                    <DatePicker
                        clearIcon={false}
                        format="YYYY-MM-DD"
                        onChange={(value) => formik.setFieldValue("startTime", formatDate(value))}
                    />
                </Form.Item>

                <Form.Item
                    label="Thời gian kết thúc"
                    name="endTime"
                    help={formik.errors.endTime}
                    validateStatus={formik.errors.endTime ? "error" : "success"}
                    initialValue={moment(formik.values.endTime)}
                >
                    <DatePicker
                        clearIcon={false}
                        format="YYYY-MM-DD"
                        onChange={(value) => formik.setFieldValue("endTime", formatDate(value))}
                    />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    help={formik.errors.description}
                    validateStatus={formik.errors.description ? "error" : "success"}
                    initialValue={formik.values.description}
                >
                    <TextArea
                        rows={5}
                        onChange={(e) => formik.setFieldValue("description", e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
