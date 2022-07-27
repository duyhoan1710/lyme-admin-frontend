import { Button, Col, Image, Input, Modal, Row } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { ButtonAddStyle } from "src/Components/Common/button";
import { formatDateTime } from "src/Utils/dateTime";
import styled from "styled-components";
import { ModalCreateEvaluate } from "./create";

export const Evaluate = () => {
    interface DataType {
        key: React.Key;
        id: number;
        username: string;
        phone: string;
        productCode: string;
        productName: string;
        content: string;
        rate: number;
        action: React.ReactElement;
        createAt: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: "STT",
            dataIndex: "id",
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
            title: "Mã SP",
            dataIndex: "productCode",
        },
        {
            title: "Tên SP",
            dataIndex: "productName",
        },
        {
            title: "Đánh giá",
            dataIndex: "rate",
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            render: (value) => <div className="three-dot-multiple-line">{value}</div>,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createAt",
        },
        {
            title: "",
            dataIndex: "action",
            width: "150px",
        },
    ];

    const data: DataType[] = [
        {
            key: "1",
            id: 1,
            username: "John Brown",
            phone: "0123456789",
            productCode: "ZA101010",
            productName: "listym shot term",
            rate: 4.6,
            content:
                "1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
            createAt: formatDateTime(),
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button onClick={() => setIsOpenModalRemoveCategory(true)}>Xóa</Button>
                </div>
            ),
        },
        {
            key: "1",
            id: 1,
            username: "John Brown",
            phone: "0123456789",
            productCode: "ZA101010",
            productName: "listym shot term",
            rate: 4.6,
            content:
                "1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
            createAt: formatDateTime(),
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button onClick={() => setIsOpenModalRemoveCategory(true)}>Xóa</Button>
                </div>
            ),
        },
        {
            key: "1",
            id: 1,
            username: "John Brown",
            phone: "0123456789",
            productCode: "ZA101010",
            productName: "listym shot term",
            rate: 4.6,
            createAt: formatDateTime(),
            content:
                "1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button onClick={() => setIsOpenModalRemoveCategory(true)}>Xóa</Button>
                </div>
            ),
        },
        {
            key: "1",
            id: 1,
            username: "John Brown",
            phone: "0123456789",
            productCode: "ZA101010",
            productName: "listym shot term",
            rate: 4.6,
            createAt: formatDateTime(),
            content:
                "1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra",
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button onClick={() => setIsOpenModalRemoveCategory(true)}>Xóa</Button>
                </div>
            ),
        },
    ];

    const [isOpenModalCreateEvaluate, setIsOpenCreateCategory] = useState(false);
    const [isOpenModalRemoveCategory, setIsOpenModalRemoveCategory] = useState(false);

    return (
        <StyledEvaluate>
            <div className="filter">
                <Row gutter={30} className="input-group">
                    <Col md={5}>
                        <Input placeholder="Người mua hoặc SĐT" />
                    </Col>
                    <Col md={5}>
                        <Input placeholder="Mã SP hoặc tên SP" />
                    </Col>
                </Row>

                <div className="add-more-button">
                    <ButtonAddStyle onClick={() => setIsOpenCreateCategory(true)}>
                        Thêm Mới
                    </ButtonAddStyle>
                    <ModalCreateEvaluate
                        isModalVisible={isOpenModalCreateEvaluate}
                        handleCancel={() => setIsOpenCreateCategory(false)}
                    />
                </div>
            </div>

            <Table columns={columns} dataSource={data} size="middle" bordered pagination={false} />

            <Modal
                title="Xóa đánh giá"
                visible={isOpenModalRemoveCategory}
                onOk={() => setIsOpenModalRemoveCategory(false)}
                onCancel={() => setIsOpenModalRemoveCategory(false)}
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
        display: flex;
        justify-content: space-between;

        .input-group {
            flex-grow: 1;
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
