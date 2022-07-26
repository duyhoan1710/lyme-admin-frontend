import { IModal, IProductOptionObject, IProductOptionObjectError } from "@interfaces";
import { Button, Col, Form, Input, Modal, Row, Upload } from "antd";
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
                        onChange={(e) => formik.setFieldValue("image", e.fileList[0])}
                        maxCount={1}
                        style={{ width: "100%" }}
                    >
                        <Button icon={<UploadOutlined />}>Click Here</Button>
                    </Upload>
                </Form.Item>
            </Col>

            <Col md={6}>
                <div>Size</div>
                <Form.Item
                    name={`size-${productOptionKey}`}
                    help={formik.errors.size}
                    validateStatus={formik.errors.size ? "error" : "success"}
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

    const addNewProductOption = () => {
        const code: string = randomString(8);

        setProductOptionObject({
            ...productOptionObject,
            [code]: {
                image: "",
                size: "",
                color: "",
                quantity: "",
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
                    label="Giá"
                    name="price"
                    help={formik.errors.price}
                    validateStatus={formik.errors.price ? "error" : "success"}
                >
                    <Input onChange={(e) => formik.setFieldValue("price", e.target.value)} />
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
