import { Form, Image, Input, Modal } from "antd";
import { useFormik } from "formik";
import { IModal } from "src/Interfaces/component";
import { formatVND } from "src/Utils";
import TextArea from "antd/lib/input/TextArea";
import Table, { ColumnsType } from "antd/lib/table";

export const ModalUpdateOrder = ({ isModalVisible, handleCancel }: IModal) => {
    const formik = useFormik({
        initialValues: {
            categoryName: "",
            categoryImage: "",
        },
        // validationSchema: createCategorySchema,
        onSubmit: (value) => {
            console.log(value);
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
        discount?: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (value) => <Image src={value} width={80} height={50} preview={false} />,
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
            title: "Giảm giá",
            dataIndex: "discount",
            render: (value) => (value ? `${value}%` : ""),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
    ];

    const data: DataType[] = [
        {
            key: "1",
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            code: "ZA10101",
            name: "lorem ayha",
            size: "xl",
            color: "red",
            quantity: 2,
            price: 990000,
            discount: 20,
        },
        {
            key: "1",
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            code: "ZA10101",
            name: "lorem ayha",
            size: "xl",
            color: "red",
            quantity: 2,
            price: 990000,
            discount: 18,
        },
        {
            key: "1",
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            code: "ZA10101",
            name: "lorem ayha",
            size: "xl",
            color: "red",
            quantity: 2,
            price: 990000,
            discount: 10,
        },
        {
            key: "1",
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            code: "ZA10101",
            name: "lorem ayha",
            size: "xl",
            color: "red",
            quantity: 2,
            price: 990000,
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
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Nguời mua" initialValue="Nguyen Duy Hoan">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Số Điện Thoại" initialValue="0912345678">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Địa chỉ" initialValue="">
                    <TextArea disabled rows={3} />
                </Form.Item>

                <Form.Item label="Lời nhắn" initialValue="">
                    <TextArea disabled rows={3} />
                </Form.Item>

                <Form.Item label="Tổng tiền" initialValue={formatVND(374000)}>
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Mã vận đơn" initialValue="ZA10000">
                    <Input />
                </Form.Item>

                <Form.Item label="Trạng thái" initialValue="PENDING">
                    <Input />
                </Form.Item>

                <Form.Item label="Ngày tạo đơn hàng">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Ngày tạo vận đơn">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Ngày giao hàng thành công">
                    <Input disabled />
                </Form.Item>
            </Form>

            <h3>Sản phẩm</h3>
            <Table columns={columns} dataSource={data} size="middle" bordered pagination={false} />
        </Modal>
    );
};
