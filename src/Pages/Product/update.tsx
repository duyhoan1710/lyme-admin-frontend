import {
    ICategory,
    IModal,
    IProduct,
    IProductOptionObject,
    IProductOptionObjectError,
    ISale,
} from "@interfaces";
import { Button, Col, Form, Input, Modal, Row, Upload, Select, Image } from "antd";
import { useFormik } from "formik";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { convertStringToNumber, formatNumber, formatVND, getImage, randomString } from "@utils";
import { ButtonAddStyle } from "src/Components/Common/button";
import { productOptionSchema, productSchema } from "./validation";
import { toast } from "react-toastify";
import { useCategory } from "src/hooks/useCategory";
import { useSales } from "src/hooks/useSales";
import { ESaleType } from "@enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "src/services/products";
import { uploadFile } from "src/services/files";

const { Option } = Select;

export const ProductOption = React.memo(
    ({
        handleUpdateValue,
        setProductOptionObject,
        productOptionObject,
        setProductOptionObjectError,
        productOptionObjectError,
        productOptionKey,
        countSubmit,
    }: {
        handleUpdateValue: (key: string, data: any) => void;
        setProductOptionObject: (data: IProductOptionObject) => void;
        productOptionObject: IProductOptionObject;
        setProductOptionObjectError: (data: IProductOptionObjectError) => void;
        productOptionObjectError: IProductOptionObjectError;
        productOptionKey: string;
        countSubmit: number;
    }) => {
        const [imageUpload, setImageUpload] = useState(
            productOptionObject[productOptionKey].images
        );
        const [isLoading, setIsLoading] = useState(false);

        const formik = useFormik({
            initialValues: productOptionObject[productOptionKey],
            validationSchema: productOptionSchema,
            onSubmit: () => {
                return;
            },
        });

        useEffect(() => {
            const validateField = async () => {
                const errors = await formik.validateForm();

                if (!Object.keys(errors).length) {
                    handleUpdateValue(productOptionKey, {
                        ...formik.values,
                        images: imageUpload,
                    });

                    const productObjectErrorClone = { ...productOptionObjectError };
                    productObjectErrorClone[productOptionKey] = false;
                    setProductOptionObjectError(productObjectErrorClone);
                } else {
                    const productObjectErrorClone = { ...productOptionObjectError };
                    productObjectErrorClone[productOptionKey] = true;
                    setProductOptionObjectError(productObjectErrorClone);
                }
            };

            if (countSubmit) {
                validateField();
            }
        }, [countSubmit]);

        const normFile = (e: any) => {
            if (Array.isArray(e)) {
                return e;
            }
            return e?.fileList;
        };

        const beforeUpload = (file: RcFile) => {
            return false;
        };

        useEffect(() => {
            const upload = async () => {
                if (formik.values.images.length) {
                    setIsLoading(true);
                    const res = await uploadFile(
                        formik.values.images.map((image: any) => image.originFileObj)
                    );
                    setImageUpload([...imageUpload, ...res.data.result.filenames]);
                    setIsLoading(false);
                }
            };

            upload();
        }, [formik.values.images]);

        const removeProductOption = (key: string) => {
            const productOptionClone = { ...productOptionObject };
            delete productOptionClone[key];
            setProductOptionObject(productOptionClone);
        };

        const onDeleteImage = (index: number) => {
            const imageArr = [...imageUpload];
            imageArr.splice(index, 1);
            setImageUpload(imageArr);
        };

        return (
            <Row>
                <Col md={6}>
                    <div>Ảnh</div>
                    <Form.Item
                        name={`image-${productOptionKey}`}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        help={formik.errors.images}
                        validateStatus={formik.errors.images ? "error" : "success"}
                    >
                        <Upload
                            listType="picture"
                            beforeUpload={beforeUpload}
                            onChange={(e) => {
                                formik.setFieldValue("images", e.fileList);
                            }}
                            style={{ width: "100%" }}
                            multiple
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Click to Here</Button>
                        </Upload>
                    </Form.Item>

                    <div style={{ marginBottom: 15 }}>
                        {imageUpload?.map((image, index) => (
                            <div
                                key={image}
                                style={{ display: "flex", alignItems: "center", marginBottom: 15 }}
                            >
                                <Image src={getImage(image)} width={110} height={70} />
                                <div
                                    style={{ fontSize: 20, marginLeft: 10, cursor: "pointer" }}
                                    onClick={() => onDeleteImage(index)}
                                >
                                    x
                                </div>
                            </div>
                        ))}

                        {isLoading && "Loading..."}
                    </div>
                </Col>

                <Col md={6}>
                    <div>Size</div>
                    <Form.Item
                        name={`size-${productOptionKey}`}
                        help={formik.errors.size}
                        validateStatus={formik.errors.size ? "error" : "success"}
                        initialValue={formik.values.size}
                    >
                        <Input onChange={(e) => formik.setFieldValue("size", e.target.value)} />
                    </Form.Item>
                </Col>

                <Col md={6}>
                    <div>Color</div>
                    <Form.Item
                        name={`color-${productOptionKey}`}
                        help={formik.errors.color}
                        validateStatus={formik.errors.color ? "error" : "success"}
                        initialValue={formik.values.color}
                    >
                        <Input onChange={(e) => formik.setFieldValue("color", e.target.value)} />
                    </Form.Item>
                </Col>

                <Col md={5}>
                    <div>Quantity</div>
                    <Form.Item
                        name={`quantity-${productOptionKey}`}
                        help={formik.errors.quantity}
                        validateStatus={formik.errors.quantity ? "error" : "success"}
                        initialValue={formik.values.quantity}
                    >
                        <Input onChange={(e) => formik.setFieldValue("quantity", e.target.value)} />
                    </Form.Item>
                </Col>

                <Col md={1} style={{ marginTop: "25px" }}>
                    <CloseOutlined onClick={() => removeProductOption(productOptionKey)} />
                </Col>
            </Row>
        );
    }
);

export interface IUpdateProduct extends IModal {
    data: IProduct;
}

export const ModalUpdateProduct = ({ isModalVisible, handleCancel, data }: IUpdateProduct) => {
    const queryClient = useQueryClient();

    const { data: categories } = useCategory({});
    const { data: sales } = useSales({});

    const [productOptionObject, setProductOptionObject] = useState<IProductOptionObject>({});
    const [productOptionObjectError, setProductOptionObjectError] =
        useState<IProductOptionObjectError>({});

    const [countSubmit, setCountSubmit] = useState(0);

    const [sizeList, setSizeList] = useState<string[]>([]);
    const [colorList, setColorList] = useState<string[]>([]);

    const addNewProductOption = () => {
        const code: string = randomString(8);

        setProductOptionObject({
            ...productOptionObject,
            [code]: {
                images: [],
                size: "",
                color: "",
                quantity: undefined,
            },
        });
    };

    const handleUpdateValue = (key: string, data: any) => {
        setProductOptionObject((preValue) => {
            preValue[key] = data;
            return preValue;
        });
    };

    useEffect(() => {
        const newProductOptionObject: IProductOptionObject = {};
        data.subProducts.forEach((subProduct) => {
            const code: string = randomString(8);

            newProductOptionObject[code] = {
                images: subProduct.images,
                size: subProduct.size,
                color: subProduct.color,
                quantity: subProduct.quantity,
            };
        });

        setProductOptionObject(newProductOptionObject);
    }, []);

    const { mutate: handleUpdateProduct } = useMutation(
        async () => {
            await updateProduct({
                ...formik.values,
                id: data.id,
                price: convertStringToNumber(formik.values.price?.toString()),
                subProducts: Object.values(productOptionObject).map((value) => ({
                    ...value,
                    productId: data.id,
                })),
            });
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["PRODUCTS"]);
                handleCancel();
            },
            onError: (res: any) => {
                toast.error(res.response?.data?.message || res.message);
            },
        }
    );

    const formik = useFormik({
        initialValues: {
            code: data.code,
            name: data.name,
            price: data.price,
            description: data.description,
            categoryId: data.categoryId,
            saleId: data.saleProducts[0]?.id,
            saleValue: data.saleProducts[0]?.value,
            saleType: data.saleProducts[0]?.saleType,
        },
        validationSchema: productSchema,
        onSubmit: (value) => {
            if (!Object.values(productOptionObjectError).includes(true)) {
                handleUpdateProduct();
            }
        },
    });

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const handleChangeSize = (value: string[]) => {
        setSizeList(value);
    };

    const handleChangeColor = (value: string[]) => {
        setColorList(value);
    };

    const generateProductOption = () => {
        let productOptions: IProductOptionObject = {};
        sizeList.forEach((size: string) => {
            colorList.forEach((color: string) => {
                const code: string = randomString(8);

                productOptions = {
                    ...productOptions,
                    [code]: {
                        images: [],
                        size,
                        color,
                        quantity: 50,
                    },
                };
            });
        });

        if (Object.keys(productOptions).length) {
            setProductOptionObject(productOptions);
        }
    };

    return (
        <Modal
            title="Chỉnh sửa sản phẩm"
            visible={isModalVisible}
            onOk={() => {
                setCountSubmit((preValue) => preValue + 1);
                setTimeout(() => formik.handleSubmit(), 500);
            }}
            onCancel={handleCancel}
            okText="Đồng ý"
            cancelText="Đóng"
            width={800}
        >
            <Form colon={false} labelAlign="left" {...formItemLayout}>
                <Form.Item
                    label="Mã Sản Phẩm"
                    name="code"
                    help={formik.errors.code}
                    validateStatus={formik.errors.code ? "error" : "success"}
                    initialValue={formik.values.code}
                >
                    <Input onChange={(e) => formik.setFieldValue("code", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Tên Sản Phẩm"
                    name="name"
                    help={formik.errors.name}
                    validateStatus={formik.errors.name ? "error" : "success"}
                    initialValue={formik.values.name}
                >
                    <Input onChange={(e) => formik.setFieldValue("name", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Loại Sản Phẩm"
                    name="categoryId"
                    help={formik.errors.categoryId}
                    validateStatus={formik.errors.categoryId ? "error" : "success"}
                >
                    <Select
                        defaultValue={formik.values.categoryId}
                        onChange={(value) => formik.setFieldValue("categoryId", value)}
                    >
                        {categories?.result?.map((category: ICategory) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    help={formik.errors.price}
                    validateStatus={formik.errors.price ? "error" : "success"}
                    initialValue={formik.values.price}
                    normalize={(value) => {
                        return formatNumber(value);
                    }}
                >
                    <Input onChange={(e) => formik.setFieldValue("price", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Đợt Sale"
                    name="saleId"
                    help={formik.errors.saleId}
                    validateStatus={formik.errors.saleId ? "error" : "success"}
                >
                    <Select onChange={(value) => formik.setFieldValue("saleId", value)}>
                        {sales?.result?.map((sale: ISale) => (
                            <Option key={sale.id} value={sale.id}>
                                {sale.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Giảm Giá"
                    name="saleValue"
                    help={formik.errors.saleValue}
                    validateStatus={formik.errors.saleValue ? "error" : "success"}
                >
                    <Input
                        addonAfter={
                            <Form.Item name="suffix" noStyle>
                                <Select
                                    style={{ width: 100 }}
                                    onChange={(value) => {
                                        formik.setFieldValue("saleType", value);
                                    }}
                                    defaultValue={formik.values.saleType}
                                >
                                    <Option value="cent">VND</Option>
                                    <Option value="percent">%</Option>
                                </Select>
                            </Form.Item>
                        }
                        style={{ width: "100%" }}
                        onChange={(e) => formik.setFieldValue("saleValue", e.target.value)}
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
                        onChange={(e) => formik.setFieldValue("description", e.target.value)}
                        rows={3}
                    />
                </Form.Item>

                <Row style={{ alignItems: "flex-end" }}>
                    <Col md={18} style={{ flexGrow: 1 }}>
                        <Form.Item
                            label="Size"
                            name="size"
                            labelCol={{ md: 8 }}
                            wrapperCol={{ md: 16 }}
                        >
                            <Select
                                mode="tags"
                                style={{ width: "100%" }}
                                onChange={handleChangeSize}
                            ></Select>
                        </Form.Item>

                        <Form.Item
                            label="Color"
                            name="color"
                            labelCol={{ md: 8 }}
                            wrapperCol={{ md: 16 }}
                        >
                            <Select
                                mode="tags"
                                style={{ width: "100%" }}
                                onChange={handleChangeColor}
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col>
                        <ButtonAddStyle
                            style={{ marginBottom: "24px", marginLeft: "20px" }}
                            onClick={generateProductOption}
                        >
                            Generate
                        </ButtonAddStyle>
                    </Col>
                </Row>

                <h3>Option</h3>

                {Object.keys(productOptionObject).map((key) => (
                    <ProductOption
                        key={key}
                        handleUpdateValue={handleUpdateValue}
                        setProductOptionObject={setProductOptionObject}
                        productOptionObject={productOptionObject}
                        setProductOptionObjectError={setProductOptionObjectError}
                        productOptionObjectError={productOptionObjectError}
                        productOptionKey={key}
                        countSubmit={countSubmit}
                    />
                ))}

                <ButtonAddStyle onClick={addNewProductOption}>Thêm</ButtonAddStyle>
            </Form>
        </Modal>
    );
};
