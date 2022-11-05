import { formatVND } from "@utils";
import { Button, Col, Image, Input, Modal, Row, Table, Select, Collapse } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { formatDateTime } from "src/Utils/dateTime";
import styled from "styled-components";
import { ModalUpdateOrder } from "./update";
import { useOrder } from "../../hooks/useOrder";
const { Option } = Select;
const { Panel } = Collapse;

export const Order = () => {
    const { data: orders } = useOrder({});
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

    const [removeOrderId, setRemoveOrderId] = useState<number>();
    const [updateOrderId, setUpdateOrderId] = useState<number>();

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <StyledEvaluate>
            <div className="filter">
                <Row gutter={10}>
                    <Col md={4}>
                        <Input placeholder="Người mua hoặc SĐT" />
                    </Col>
                    <Col md={4}>
                        <Input placeholder="Mã SP hoặc tên SP" />
                    </Col>

                    <Col md={4}>
                        <Input placeholder="Mã đơn hàng" />
                    </Col>

                    <Col md={4}>
                        <Input placeholder="Mã vận đơn" />
                    </Col>

                    <Col md={4}>
                        <Select defaultValue={null} onChange={handleChange} style={{ width: 200 }}>
                            <Option value={null}>Tất Cả</Option>
                            <Option value="1">PENDING</Option>
                            <Option value="2">SUCCESS</Option>
                            <Option value="3">REJECT</Option>
                        </Select>
                    </Col>
                </Row>
            </div>

            <Row className="custom-header">
                <Col md={1} className="custom-col">
                    STT
                </Col>
                <Col md={3} className="custom-col">
                    Mã đơn hàng
                </Col>
                <Col md={3} className="custom-col">
                    Người mua
                </Col>
                <Col md={3} className="custom-col">
                    SĐT
                </Col>
                <Col md={3} className="custom-col">
                    Tổng tiền
                </Col>
                <Col md={3} className="custom-col">
                    Mã vận đơn
                </Col>
                <Col md={2} className="custom-col">
                    Trạng thái
                </Col>
                <Col md={3} className="custom-col">
                    Ngày tạo
                </Col>
                <Col md={3} className="custom-col action-column"></Col>
            </Row>

            <Collapse onChange={onChange}>
                <Panel
                    header={
                        <Row className="custom-row">
                            <Col md={1} className="custom-col">
                                1
                            </Col>
                            <Col md={3} className="custom-col">
                                ZA10000
                            </Col>
                            <Col md={3} className="custom-col">
                                hoan duy nguyen
                            </Col>
                            <Col md={3} className="custom-col">
                                0123456789
                            </Col>
                            <Col md={3} className="custom-col">
                                {formatVND(349000)}
                            </Col>
                            <Col md={3} className="custom-col">
                                AHDUYQAEH3AFC
                            </Col>
                            <Col md={2} className="custom-col">
                                PEDDING
                            </Col>
                            <Col md={3} className="custom-col">
                                {formatDateTime()}
                            </Col>
                            <Col md={3} className="custom-col">
                                <div className="action-column">
                                    <Button
                                        type="primary"
                                        onClick={(e) => {
                                            setUpdateOrderId(1);
                                            e.stopPropagation();
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={(e) => {
                                            setRemoveOrderId(1);
                                            e.stopPropagation();
                                        }}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    }
                    key="1"
                    showArrow={false}
                    className="custom-panel"
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        size="middle"
                        bordered
                        pagination={false}
                    />
                </Panel>

                <Panel
                    header={
                        <Row className="custom-row">
                            <Col md={1} className="custom-col">
                                1
                            </Col>
                            <Col md={3} className="custom-col">
                                ZA10000
                            </Col>
                            <Col md={3} className="custom-col">
                                hoan duy nguyen
                            </Col>
                            <Col md={3} className="custom-col">
                                0123456789
                            </Col>
                            <Col md={3} className="custom-col">
                                {formatVND(349000)}
                            </Col>
                            <Col md={3} className="custom-col">
                                AHDUYQAEH3AFC
                            </Col>
                            <Col md={2} className="custom-col">
                                PEDDING
                            </Col>
                            <Col md={3} className="custom-col">
                                {formatDateTime()}
                            </Col>
                            <Col md={3} className="custom-col">
                                <div className="action-column">
                                    <Button
                                        type="primary"
                                        onClick={(e) => {
                                            setUpdateOrderId(1);
                                            e.stopPropagation();
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={(e) => {
                                            setRemoveOrderId(1);
                                            e.stopPropagation();
                                        }}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    }
                    key="4"
                    showArrow={false}
                    className="custom-panel"
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        size="middle"
                        bordered
                        pagination={false}
                    />
                </Panel>

                <Panel
                    header={
                        <Row className="custom-row">
                            <Col md={1} className="custom-col">
                                1
                            </Col>
                            <Col md={3} className="custom-col">
                                ZA10000
                            </Col>
                            <Col md={3} className="custom-col">
                                hoan duy nguyen
                            </Col>
                            <Col md={3} className="custom-col">
                                0123456789
                            </Col>
                            <Col md={3} className="custom-col">
                                {formatVND(349000)}
                            </Col>
                            <Col md={3} className="custom-col">
                                AHDUYQAEH3AFC
                            </Col>
                            <Col md={2} className="custom-col">
                                PEDDING
                            </Col>
                            <Col md={3} className="custom-col">
                                {formatDateTime()}
                            </Col>
                            <Col md={3} className="custom-col">
                                <div className="action-column">
                                    <Button
                                        type="primary"
                                        onClick={(e) => {
                                            setUpdateOrderId(1);
                                            e.stopPropagation();
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={(e) => {
                                            setRemoveOrderId(1);
                                            e.stopPropagation();
                                        }}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    }
                    key="2"
                    showArrow={false}
                    className="custom-panel"
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        size="middle"
                        bordered
                        pagination={false}
                    />
                </Panel>

                <Panel
                    header={
                        <Row className="custom-row">
                            <Col md={1} className="custom-col">
                                1
                            </Col>
                            <Col md={3} className="custom-col">
                                ZA10000
                            </Col>
                            <Col md={3} className="custom-col">
                                hoan duy nguyen
                            </Col>
                            <Col md={3} className="custom-col">
                                0123456789
                            </Col>
                            <Col md={3} className="custom-col">
                                {formatVND(349000)}
                            </Col>
                            <Col md={3} className="custom-col">
                                AHDUYQAEH3AFC
                            </Col>
                            <Col md={2} className="custom-col">
                                PEDDING
                            </Col>
                            <Col md={3} className="custom-col">
                                {formatDateTime()}
                            </Col>
                            <Col md={3} className="custom-col">
                                <div className="action-column">
                                    <Button
                                        type="primary"
                                        onClick={(e) => {
                                            setUpdateOrderId(1);
                                            e.stopPropagation();
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={(e) => {
                                            setRemoveOrderId(1);
                                            e.stopPropagation();
                                        }}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    }
                    key="3"
                    showArrow={false}
                    className="custom-panel"
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        size="middle"
                        bordered
                        pagination={false}
                    />
                </Panel>
            </Collapse>

            <Modal
                title="Xóa đơn hàng"
                visible={!!removeOrderId}
                onOk={() => setRemoveOrderId(undefined)}
                onCancel={() => setRemoveOrderId(undefined)}
                okText="Đồng ý"
                cancelText="Đóng"
            >
                Bạn có chắc chắn muốn xóa ?
            </Modal>

            <ModalUpdateOrder
                handleCancel={() => setUpdateOrderId(undefined)}
                isModalVisible={!!updateOrderId}
            />
        </StyledEvaluate>
    );
};

const StyledEvaluate = styled.div`
    .filter {
        margin-bottom: 15px;
    }

    .custom-panel {
        .ant-collapse-header {
            padding: 0 !important;
            display: block;
        }
    }

    .custom-header {
        background: #fafafa;
        border-top: 1px solid #d9d9d9;
        border-left: 1px solid #d9d9d9;
        border-right: 1px solid #d9d9d9;

        .custom-col {
            font-weight: 500;
        }
    }

    .custom-row {
        background: #fff;
        cursor: pointer;
    }

    .custom-row:hover {
        background: #fafafa;
        transition: all 0.5s;
    }

    .custom-col {
        color: rgba(0, 0, 0, 0.85);

        padding: 12px 8px;

        &:not(:last-child) {
            border-right: 1px solid #d9d9d9;
        }
    }

    .action-column {
        display: flex;
        justify-content: center;

        button {
            margin: 0 5px;
        }
    }
`;
