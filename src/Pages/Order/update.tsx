import { Form, Image, Input, Modal, Select } from "antd";
import { useFormik } from "formik";
import { IModal } from "src/Interfaces/component";
import { formatVND, getImage } from "src/Utils";
import TextArea from "antd/lib/input/TextArea";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { formatDateTime } from "src/Utils/dateTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "src/services/order";

const { Option } = Select;

interface UpdateModal extends IModal {
    data: any;
}
export const ModalUpdateOrder = ({ isModalVisible, handleCancel, data }: UpdateModal) => {
    const queryClient = useQueryClient();

    const [dataTable, setDataTable] = useState<any>();

    const { mutate: handleUpdate } = useMutation(
        () =>
            updateOrder({
                id: data.id,
                status: formik.values.status,
                shippingCode: formik.values.shippingCode,
            }),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["ORDER"]);
                handleCancel();
            },
        }
    );

    useEffect(() => {
        if (data && data.rawSubProduct) {
            const subData = [...data.rawSubProduct];

            setDataTable(
                subData.map((subProduct, index) => ({
                    ...subProduct,
                    id: index + 1,
                    price: subProduct.product.price,
                    code: subProduct.product.code,
                    name: subProduct.product.name,
                    image: subProduct.images.length ? subProduct.images[0] : null,
                }))
            );
        }
    }, [data]);

    const formik = useFormik({
        initialValues: {
            code: data?.code,
            receiverName: data?.receiverName,
            receiverPhone: data?.receiverPhone,
            address: data?.address,
            note: data?.note,
            totalAmount: data?.totalAmount,
            status: data?.status,
            createdDate: data?.createdDate,
            shippingCode: data?.shippingCode,
        },
        // validationSchema: createCategorySchema,
        onSubmit: (value) => {
            handleUpdate();
        },
    });

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    interface DataType {
        key: React.Key;
        id: number;
        code: string;
        name: string;
        image: string;
        size: string;
        color: string;
        quantity: number;
        price: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (value) => (
                <Image src={getImage(value)} width={80} height={50} preview={false} />
            ),
        },
        {
            title: "Mã SP",
            dataIndex: "code",
        },
        {
            title: "Tên SP",
            dataIndex: "name",
        },
        {
            title: "Size",
            dataIndex: "size",
        },
        {
            title: "Màu sắc",
            dataIndex: "color",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            render: (value) => formatVND(value),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
    ];

    return (
        <Modal
            title="Chỉnh sửa đơn hàng"
            visible={isModalVisible}
            onOk={() => formik.handleSubmit()}
            onCancel={handleCancel}
            okText="Đồng ý"
            cancelText="Đóng"
            width={800}
        >
            <Form colon={false} labelAlign="left" {...formItemLayout}>
                <Form.Item label="Mã đơn hàng" initialValue="ZA10000">
                    <Input disabled value={formik.values.code} />
                </Form.Item>

                <Form.Item label="Nguời mua" initialValue="Nguyen Duy Hoan">
                    <Input disabled value={formik.values.receiverName} />
                </Form.Item>

                <Form.Item label="Số Điện Thoại" initialValue="0912345678">
                    <Input disabled value={formik.values.receiverPhone} />
                </Form.Item>

                <Form.Item label="Địa chỉ" initialValue="">
                    <TextArea disabled rows={3} value={formik.values.address} />
                </Form.Item>

                <Form.Item label="Lời nhắn" initialValue="">
                    <TextArea disabled rows={3} value={formik.values.note} />
                </Form.Item>

                <Form.Item label="Tổng tiền" initialValue={formatVND(374000)}>
                    <Input disabled value={formatVND(formik.values.totalAmount)} />
                </Form.Item>

                <Form.Item label="Mã vận đơn" initialValue="ZA10000">
                    <Input
                        value={formik.values.shippingCode}
                        onChange={(e) => formik.setFieldValue("shippingCode", e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Trạng thái" initialValue="PENDING">
                    <Select
                        style={{ width: "100%" }}
                        onChange={(value) => formik.setFieldValue("status", value)}
                        value={formik.values.status}
                    >
                        <Option value="ordered">Ordered</Option>
                        <Option value="shipping">Shipping</Option>
                        <Option value="received">Received</Option>
                        <Option value="canceled">Canceled</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Ngày tạo đơn hàng">
                    <Input disabled value={formatDateTime(formik.values.createdDate)} />
                </Form.Item>

                <Form.Item label="Ngày tạo vận đơn">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Ngày giao hàng thành công">
                    <Input disabled />
                </Form.Item>
            </Form>

            <h3>Sản phẩm</h3>
            {dataTable && (
                <Table
                    columns={columns}
                    dataSource={dataTable}
                    size="middle"
                    bordered
                    pagination={false}
                />
            )}
        </Modal>
    );
};
