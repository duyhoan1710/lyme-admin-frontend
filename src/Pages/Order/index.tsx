import { Button, Col, Image, Input, Modal, Row, Table, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { formatDateTime } from "src/Utils/dateTime";
import styled from "styled-components";

const { Option } = Select;

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

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <StyledEvaluate>
            <div className="filter">
                <Row gutter={30}>
                    <Col md={5}>
                        <Input placeholder="Người mua hoặc SĐT" />
                    </Col>
                    <Col md={5}>
                        <Input placeholder="Mã SP hoặc tên SP" />
                    </Col>
                    <Col md={5}>
                        <Select defaultValue={null} onChange={handleChange} style={{ width: 200 }}>
                            <Option value={null}>Tất Cả</Option>
                            <Option value="1">PENDING</Option>
                            <Option value="2">SUCCESS</Option>
                            <Option value="3">REJECT</Option>
                        </Select>
                    </Col>
                </Row>
            </div>

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
    .filter {
        margin-bottom: 15px;
    }

    .action-column {
        display: flex;
        justify-content: center;

        button {
            margin: 0 5px;
        }
    }
`;
