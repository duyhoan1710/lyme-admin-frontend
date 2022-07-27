import { IModal, IProductOptionObject, IProductOptionObjectError } from "@interfaces";
import { Button, Col, Form, Input, Modal, Row, Upload, Select } from "antd";
import { useFormik } from "formik";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { randomString } from "@utils";
import { ButtonAddStyle } from "src/Components/Common/button";
import { productOptionSchema, productSchema } from "./validation";
import { toast } from "react-toastify";

export const ProductOption = ({
    setProductOptionObject,
    productOptionObject,
    setProductOptionObjectError,
    productOptionObjectError,
    productOptionKey,
    countSubmit,
}: {
    setProductOptionObject: (data: IProductOptionObject) => void;
    productOptionObject: IProductOptionObject;
    setProductOptionObjectError: (data: IProductOptionObjectError) => void;
    productOptionObjectError: IProductOptionObjectError;
    productOptionKey: string;
    countSubmit: number;
}) => {
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
                const productObjectClone = { ...productOptionObject };
                productObjectClone[productOptionKey] = formik.values;
                setProductOptionObject(productObjectClone);

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

    const removeProductOption = (key: string) => {
        const productOptionClone = { ...productOptionObject };
        delete productOptionClone[key];
        setProductOptionObject(productOptionClone);
    };

    return (
        <Row>
            <Col md={6}>
                <div>Ảnh</div>
                <Form.Item
                    name={`image-${productOptionKey}`}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    help={formik.errors.image}
                    validateStatus={formik.errors.image ? "error" : "success"}
                >
                    <Upload
                        listType="picture"
                        beforeUpload={beforeUpload}
                        onChange={(e) => formik.setFieldValue("image", e.fileList)}
                        style={{ width: "100%" }}
                        multiple
                    >
                        <Button icon={<UploadOutlined />}>Click to Here</Button>
                    </Upload>
                </Form.Item>
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
};

export const ModalCreateProduct = ({ isModalVisible, handleCancel }: IModal) => {
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
                image: "",
                size: "",
                color: "",
                quantity: "",
                code: "",
            },
        });
    };

    useEffect(() => {
        addNewProductOption();
    }, []);

    const formik = useFormik({
        initialValues: {
            code: "",
            name: "",
            price: "",
            description: "",
            discount: "",
            categoryId: "",
        },
        validationSchema: productSchema,
        onSubmit: (value) => {
            if (!Object.values(productOptionObjectError).includes(true)) {
                toast.success("Ok");
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
                        image: "",
                        size,
                        color,
                        quantity: 50,
                        code: "",
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
            title="Thêm mới sản phẩm"
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
                >
                    <Input onChange={(e) => formik.setFieldValue("code", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Tên Sản Phẩm"
                    name="name"
                    help={formik.errors.name}
                    validateStatus={formik.errors.name ? "error" : "success"}
                >
                    <Input onChange={(e) => formik.setFieldValue("name", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Loại Sản Phẩm"
                    name="categoryId"
                    help={formik.errors.categoryId}
                    validateStatus={formik.errors.categoryId ? "error" : "success"}
                >
                    <Input onChange={(e) => formik.setFieldValue("categoryId", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    help={formik.errors.price}
                    validateStatus={formik.errors.price ? "error" : "success"}
                >
                    <Input onChange={(e) => formik.setFieldValue("price", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Giảm Giá (%)"
                    name="discount"
                    help={formik.errors.discount}
                    validateStatus={formik.errors.discount ? "error" : "success"}
                >
                    <Input onChange={(e) => formik.setFieldValue("discount", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    help={formik.errors.description}
                    validateStatus={formik.errors.description ? "error" : "success"}
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
