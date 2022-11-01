import { ESaleType } from "@enums";
import { ICategory, IProduct, ISale } from "@interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatVND } from "@utils";
import { Button, Row, Col, Modal, Input, Select, Form } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonAddStyle } from "src/Components/Common/button";
import { useCategory } from "src/hooks/useCategory";
import { useProducts } from "src/hooks/useProducts";
import { useSales } from "src/hooks/useSales";
import { deleteProduct } from "src/services/products";
import styled from "styled-components";
import { ModalCreateProduct } from "./create";
import { ModalUpdateProduct } from "./update";
import debounce from "lodash.debounce";

const { Option } = Select;

export const Product = () => {
    const queryClient = useQueryClient();

    const [searchCode, setSearchCode] = useState();
    const [searchCategoryId, setSearchCategoryId] = useState();
    const [orderBy, setOrderBy] = useState("");
    const [orderType, setOrderType] = useState("");

    const { data: products } = useProducts({
        filter: { code: searchCode || undefined, categoryId: searchCategoryId || undefined },
        order: orderBy && orderType ? { [orderBy]: orderType } : undefined,
    });
    const { data: categories } = useCategory({});
    const { data: sales } = useSales({});

    const [isOpenModalCreateProduct, setIsOpenModalCreateProduct] = useState(false);
    const [removeProductId, setRemoveProductId] = useState<number>();
    const [updateProductId, setUpdateProductId] = useState<number>();

    // const [searchSaleId, setSearchSaleId] = useState();

    const { mutate: handleRemoveProduct } = useMutation(
        async () => {
            await deleteProduct({ id: removeProductId });
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["PRODUCTS"]);
                setRemoveProductId(undefined);
            },
            onError: (res: any) => {
                toast.error(res.response?.data?.message || res.message);
            },
        }
    );

    const searchByCode = debounce((value) => {
        setSearchCode(value);
    }, 300);

    return (
        <StyledProduct>
            <div className="filter">
                <Row gutter={20} className="input-group">
                    <Col md={4}>
                        <Input
                            placeholder="Mã sản phẩm"
                            onChange={(e) => searchByCode(e.target.value)}
                        />
                    </Col>

                    <Col md={4}>
                        <Select
                            style={{ width: "100%" }}
                            onChange={(value) => setSearchCategoryId(value)}
                            placeholder="Loại sản phẩm"
                        >
                            <Option value={null}>Tất Cả</Option>
                            {categories?.result?.map((category: ICategory) => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Col>

                    <Col md={4}>
                        <Select
                            style={{ width: "100%" }}
                            onChange={(value) => console.log(value)}
                            placeholder="Đợt sale"
                        >
                            <Option value={null}>Tất Cả</Option>
                            {sales?.result?.map((sales: ISale) => (
                                <Option key={sales.id} value={sales.id}>
                                    {sales.name}
                                </Option>
                            ))}
                        </Select>
                    </Col>

                    <Col md={4}>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Thống kê"
                            onChange={(value) => setOrderBy(value)}
                        >
                            <Option value={undefined}>Tất Cả</Option>
                            <Option value="countViewers">Lượt View</Option>
                            <Option value="countBuyers">Lượt Thanh Toán</Option>
                        </Select>
                    </Col>

                    <Col md={4}>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Sắp xếp"
                            onChange={(value) => setOrderType(value)}
                        >
                            <Option value={undefined}>Tất Cả</Option>
                            <Option value="DESC">Mới Nhất</Option>
                            <Option value="ASC">Cũ Nhất</Option>
                        </Select>
                    </Col>
                </Row>

                <div className="add-more-button">
                    <ButtonAddStyle onClick={() => setIsOpenModalCreateProduct(true)}>
                        Thêm Mới
                    </ButtonAddStyle>
                    {isOpenModalCreateProduct && (
                        <ModalCreateProduct
                            isModalVisible={isOpenModalCreateProduct}
                            handleCancel={() => setIsOpenModalCreateProduct(false)}
                        />
                    )}
                </div>
            </div>

            <Row className="custom-header">
                <Col md={1} className="custom-col">
                    Id
                </Col>
                <Col md={2} className="custom-col">
                    Mã SP
                </Col>
                <Col md={4} className="custom-col">
                    Tên SP
                </Col>
                <Col md={2} className="custom-col">
                    Loại SP
                </Col>
                <Col md={2} className="custom-col">
                    Giá
                </Col>

                <Col md={3} className="custom-col">
                    Đợt giảm giá
                </Col>

                <Col md={2} className="custom-col">
                    Giảm giá
                </Col>

                <Col md={2} className="custom-col">
                    Lượt View
                </Col>
                <Col md={3} className="custom-col">
                    Lượt Thanh Toán
                </Col>
                <Col md={3} className="custom-col action-column"></Col>
            </Row>

            {products?.result?.map((product: IProduct, index) => (
                <Row key={product.id} className="custom-row">
                    <Col md={1} className="custom-col">
                        {index + 1}
                    </Col>
                    <Col md={2} className="custom-col">
                        {product.code}
                    </Col>
                    <Col md={4} className="custom-col">
                        {product.name}
                    </Col>
                    <Col md={2} className="custom-col">
                        {product.category.name}
                    </Col>
                    <Col md={2} className="custom-col">
                        {formatVND(product.price)}
                    </Col>

                    <Col md={3} className="custom-col">
                        {!!product.saleProducts.length && product.saleProducts[0].sale.name}
                    </Col>

                    <Col md={2} className="custom-col">
                        {!!product.saleProducts.length && (
                            <>
                                {product.saleProducts[0].saleType === ESaleType.CENT
                                    ? formatVND(product.saleProducts[0].value)
                                    : `${product.saleProducts[0].value}%`}
                            </>
                        )}
                    </Col>
                    <Col md={2} className="custom-col">
                        {product.countViewers}
                    </Col>
                    <Col md={3} className="custom-col">
                        {product.countBuyers}
                    </Col>
                    <Col md={3} className="custom-col">
                        <div className="action-column">
                            <Button type="primary" onClick={() => setUpdateProductId(product.id)}>
                                Sửa
                            </Button>
                            <Button onClick={() => setRemoveProductId(product.id)}>Xóa</Button>
                        </div>
                    </Col>
                </Row>
            ))}

            {updateProductId && (
                <ModalUpdateProduct
                    isModalVisible={!!updateProductId}
                    handleCancel={() => setUpdateProductId(undefined)}
                    data={products?.result?.find((el) => el.id === updateProductId)}
                />
            )}

            <Modal
                title="Xóa sản phẩm"
                visible={!!removeProductId}
                onOk={() => handleRemoveProduct()}
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
      word-break: break-all;
    }

    .action-column {
        display: flex;
        justify-content: center;

        button {
            margin: 0 5px;
        }
    }
`;
