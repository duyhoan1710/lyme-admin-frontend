import { Button, Row, Col, Modal, Input, Select } from "antd";
import { useState } from "react";
import { ButtonAddStyle } from "src/Components/Common/button";
import styled from "styled-components";
import { ModalCreateProduct } from "./create";
import { ModalDetailProduct } from "./detail";

const { Option } = Select;

export const Product = () => {
    const [isOpenModalCreateProduct, setIsOpenModalCreateProduct] = useState(false);
    const [isOpenModalDetailProduct, setIsOpenModalDetailProduct] = useState(false);
    const [removeProductId, setRemoveProductId] = useState<number>();
    const [selectedProductId, setSelectedProductId] = useState<number>();

    return (
        <StyledProduct>
            <div className="filter">
                <Row gutter={30} className="input-group">
                    <Col md={5}>
                        <Input placeholder="Mã SP hoặc tên SP" />
                    </Col>

                    <Col md={5}>
                        <Select defaultValue={null} style={{ width: 200 }}>
                            <Option value={null}>Tất Cả</Option>
                            <Option value="1">Lượt View</Option>
                            <Option value="2">Lượt Thanh Toán</Option>
                        </Select>
                    </Col>

                    <Col md={5}>
                        <Select defaultValue={null} style={{ width: 200 }}>
                            <Option value={null}>Tất Cả</Option>
                            <Option value="1">Mới Nhất</Option>
                            <Option value="2">Cũ Nhất</Option>
                        </Select>
                    </Col>
                </Row>

                <div className="add-more-button">
                    <ButtonAddStyle onClick={() => setIsOpenModalCreateProduct(true)}>
                        Thêm Mới
                    </ButtonAddStyle>
                    <ModalCreateProduct
                        isModalVisible={isOpenModalCreateProduct}
                        handleCancel={() => setIsOpenModalCreateProduct(false)}
                    />
                </div>
            </div>

            <Row className="custom-header">
                <Col md={1} className="custom-col">
                    Id
                </Col>
                <Col md={2} className="custom-col">
                    Mã SP
                </Col>
                <Col md={5} className="custom-col">
                    Tên SP
                </Col>
                <Col md={2} className="custom-col">
                    Giá
                </Col>
                <Col md={6} className="custom-col">
                    Mô tả
                </Col>
                <Col md={2} className="custom-col">
                    Lượt View
                </Col>
                <Col md={3} className="custom-col">
                    Lượt Thanh Toán
                </Col>
                <Col md={3} className="custom-col action-column"></Col>
            </Row>
            <Row className="custom-row" onClick={() => setIsOpenModalDetailProduct(true)}>
                <Col md={1} className="custom-col">
                    1
                </Col>
                <Col md={2} className="custom-col">
                    ZA10000
                </Col>
                <Col md={5} className="custom-col">
                    Áo dài trung quốc chất lượng{" "}
                </Col>
                <Col md={2} className="custom-col">
                    1000000đ
                </Col>
                <Col md={6} className="custom-col three-dot">
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
                    it can be found as a welcome guest in many households across the world
                </Col>
                <Col md={2} className="custom-col">
                    374
                </Col>
                <Col md={3} className="custom-col">
                    46
                </Col>
                <Col md={3} className="custom-col">
                    <div className="action-column">
                        <Button type="primary">Sửa</Button>
                        <Button
                            onClick={(e) => {
                                setRemoveProductId(1);
                                e.stopPropagation();
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="custom-row" onClick={() => setIsOpenModalDetailProduct(true)}>
                <Col md={1} className="custom-col">
                    1
                </Col>
                <Col md={2} className="custom-col">
                    ZA10000
                </Col>
                <Col md={5} className="custom-col">
                    Áo dài trung quốc chất lượng{" "}
                </Col>
                <Col md={2} className="custom-col">
                    1000000đ
                </Col>
                <Col md={6} className="custom-col three-dot">
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
                    it can be found as a welcome guest in many households across the world
                </Col>
                <Col md={2} className="custom-col">
                    374
                </Col>
                <Col md={3} className="custom-col">
                    46
                </Col>
                <Col md={3} className="custom-col">
                    <div className="action-column">
                        <Button type="primary">Sửa</Button>
                        <Button
                            onClick={(e) => {
                                setRemoveProductId(1);
                                e.stopPropagation();
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="custom-row" onClick={() => setIsOpenModalDetailProduct(true)}>
                <Col md={1} className="custom-col">
                    1
                </Col>
                <Col md={2} className="custom-col">
                    ZA10000
                </Col>
                <Col md={5} className="custom-col">
                    Áo dài trung quốc chất lượng{" "}
                </Col>
                <Col md={2} className="custom-col">
                    1000000đ
                </Col>
                <Col md={6} className="custom-col three-dot">
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
                    it can be found as a welcome guest in many households across the world
                </Col>
                <Col md={2} className="custom-col">
                    374
                </Col>
                <Col md={3} className="custom-col">
                    46
                </Col>
                <Col md={3} className="custom-col">
                    <div className="action-column">
                        <Button type="primary">Sửa</Button>
                        <Button
                            onClick={(e) => {
                                setRemoveProductId(1);
                                e.stopPropagation();
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="custom-row" onClick={() => setIsOpenModalDetailProduct(true)}>
                <Col md={1} className="custom-col">
                    1
                </Col>
                <Col md={2} className="custom-col">
                    ZA10000
                </Col>
                <Col md={5} className="custom-col">
                    Áo dài trung quốc chất lượng{" "}
                </Col>
                <Col md={2} className="custom-col">
                    1000000đ
                </Col>
                <Col md={6} className="custom-col three-dot">
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
                    it can be found as a welcome guest in many households across the world
                </Col>
                <Col md={2} className="custom-col">
                    374
                </Col>
                <Col md={3} className="custom-col">
                    46
                </Col>
                <Col md={3} className="custom-col">
                    <div className="action-column">
                        <Button type="primary">Sửa</Button>
                        <Button
                            onClick={(e) => {
                                setRemoveProductId(1);
                                e.stopPropagation();
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="custom-row" onClick={() => setIsOpenModalDetailProduct(true)}>
                <Col md={1} className="custom-col">
                    1
                </Col>
                <Col md={2} className="custom-col">
                    ZA10000
                </Col>
                <Col md={5} className="custom-col">
                    Áo dài trung quốc chất lượng{" "}
                </Col>
                <Col md={2} className="custom-col">
                    1000000đ
                </Col>
                <Col md={6} className="custom-col three-dot">
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
                    it can be found as a welcome guest in many households across the world
                </Col>
                <Col md={2} className="custom-col">
                    374
                </Col>
                <Col md={3} className="custom-col">
                    46
                </Col>
                <Col md={3} className="custom-col">
                    <div className="action-column">
                        <Button type="primary">Sửa</Button>
                        <Button
                            onClick={(e) => {
                                setRemoveProductId(1);
                                e.stopPropagation();
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                </Col>
            </Row>

            <ModalDetailProduct
                isModalVisible={isOpenModalDetailProduct}
                handleCancel={() => setIsOpenModalDetailProduct(false)}
            />

            <Modal
                title="Xóa sản phẩm"
                visible={!!removeProductId}
                onOk={() => setRemoveProductId(undefined)}
                onCancel={() => setRemoveProductId(undefined)}
                okText="Đồng ý"
                cancelText="Đóng"
            >
                Bạn có chắc chắn muốn xóa ?
            </Modal>
        </StyledProduct>
    );
};

const StyledProduct = styled.div`
    .filter {
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;

        .input-group {
            flex-grow: 1;
        }
    }

    .custom-header {
        background: #fafafa;
        border: 1px solid #d9d9d9;

        .custom-col {
            font-weight: 500;
        }
    }

    .custom-row {
        border-left: 1px solid #d9d9d9;
        border-right: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
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
