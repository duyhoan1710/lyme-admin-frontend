import { Button, Image, Modal, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { formatDateTime } from "src/Utils/dateTime";
import styled from "styled-components";

export const Order = () => {
    interface DataType {
        key: React.Key;
        id: number;
        productCode: string;
        productName: string;
        image: string;
        size: string;
        color: string;
        username: string;
        phone: string;
        quantity: number;
        status: string;
        createdAt: string;
        action: React.ReactElement;
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
            dataIndex: "productCode",
        },
        {
            title: "Tên SP",
            dataIndex: "productName",
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
            title: "Số lượng",
            dataIndex: "quantity",
        },
        {
            title: "Người mua",
            dataIndex: "username",
        },
        {
            title: "SĐT",
            dataIndex: "phone",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
        },
        {
            title: "Thời gian tạo",
            dataIndex: "createdAt",
        },
        {
            title: "",
            dataIndex: "action",
        },
    ];

    const data: DataType[] = [
        {
            key: "1",
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            productCode: "ZA10101",
            productName: "lorem ayha",
            size: "xl",
            color: "red",
            quantity: 2,
            username: "John Brown",
            phone: "0123456789",
            status: "PENDING",
            createdAt: formatDateTime(),
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button onClick={() => setIsOpenModalRemoveOrder(true)}>Xóa</Button>
                </div>
            ),
        },
        {
            key: "1",
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            productCode: "ZA10101",
            productName: "lorem ayha",
            size: "xl",
            color: "red",
            quantity: 2,
            username: "John Brown",
            phone: "0123456789",
            status: "PENDING",
            createdAt: formatDateTime(),
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button onClick={() => setIsOpenModalRemoveOrder(true)}>Xóa</Button>
                </div>
            ),
        },
        {
            key: "1",
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            productCode: "ZA10101",
            productName: "lorem ayha",
            size: "xl",
            color: "red",
            quantity: 2,
            username: "John Brown",
            phone: "0123456789",
            status: "SUCCESS",
            createdAt: formatDateTime(),
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button onClick={() => setIsOpenModalRemoveOrder(true)}>Xóa</Button>
                </div>
            ),
        },
        {
            key: "1",
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            productCode: "ZA10101",
            productName: "lorem ayha",
            size: "xl",
            color: "red",
            quantity: 2,
            username: "John Brown",
            phone: "0123456789",
            status: "PENDING",
            createdAt: formatDateTime(),
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button onClick={() => setIsOpenModalRemoveOrder(true)}>Xóa</Button>
                </div>
            ),
        },
    ];

    const [isOpenModalRemoveOrder, setIsOpenModalRemoveOrder] = useState(false);

    return (
        <StyledEvaluate>
            <Table columns={columns} dataSource={data} size="middle" bordered />

            <Modal
                title="Xóa đơn hàng"
                visible={isOpenModalRemoveOrder}
                onOk={() => setIsOpenModalRemoveOrder(false)}
                onCancel={() => setIsOpenModalRemoveOrder(false)}
                okText="Đồng ý"
                cancelText="Đóng"
            >
                Bạn có chắc chắn muốn xóa ?
            </Modal>
        </StyledEvaluate>
    );
};

const StyledEvaluate = styled.div`
    .action-column {
        display: flex;
        justify-content: center;

        button {
            margin: 0 5px;
        }
    }
`;
