import { useMutation } from "@tanstack/react-query";
import { setToken } from "@utils";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "src/Api/axiosClient";
import styled from "styled-components";
import { loginSchema } from "./validation";

export const Login = () => {
    const history = useHistory();

    const { mutate: handleLogin } = useMutation(
        async () => {
            const res = await axiosClient.post("/auth/login", {
                ...formik.values,
            });

            if (res.status === 201) {
                console.log(res.data);
                setToken(res.data?.data?.accessToken);
                toast.success("Đăng nhập thành công");
                history.push("/");
            }
        },
        {
            onError: () => {
                toast.error("Đăng nhập thất bại");
            },
        }
    );

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: () => handleLogin(),
    });

    return (
        <StyledAuth>
            <div className="form-login">
                <div className="title">Login</div>

                <Form layout="horizontal" colon={false} labelAlign="left" autoComplete="off">
                    <Form.Item
                        name="email"
                        help={formik.errors.email}
                        validateStatus={formik.errors.email ? "error" : "success"}
                    >
                        <>
                            <label className="label">email</label>
                            <Input
                                type="text"
                                autoComplete="off"
                                className="input"
                                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                            />
                        </>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        help={formik.errors.password}
                        validateStatus={formik.errors.password ? "error" : "success"}
                    >
                        <>
                            <label className="label">Password</label>
                            <Input
                                autoComplete="off"
                                type="password"
                                className="input"
                                onChange={(e) => formik.setFieldValue("password", e.target.value)}
                            />
                        </>
                    </Form.Item>

                    <div className="btn-submit">
                        <Button className="button" onClick={() => formik.handleSubmit()}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </StyledAuth>
    );
};

const StyledAuth = styled.div`
    background-color: #18253a;
    background-image: linear-gradient(#18253a, #385372);
    height: 100vh;
    position: relative;

    .form-login {
        max-width: 420px;
        width: 90%;
        background-color: #0d151f;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        .title {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: bold;
            color: white;
            text-align: center;
        }

        .label {
            color: aqua;
            font-weight: 500;
            margin-bottom: 6px;
            display: block;
        }

        .input {
            background-color: #0d151f !important;
            border: 1px solid #0d151f !important;
            border-bottom: 1px solid white !important;
            color: white !important;
            margin-bottom: 6px;

            :focus {
                border: 1px solid #0d151f;
                border-bottom: 1px solid aqua;
            }

            :hover {
                border: 1px solid #0d151f;
                border-bottom: 1px solid aqua;
            }
        }

        border: 1px solid;
        padding: 40px;

        .btn-submit {
            display: flex;
            justify-content: flex-end;

            .button {
                background-color: #0d151f;
                border-top: none;
                border-left: none;
                border-bottom: 1px solid aqua !important;
                border-right: 1px solid aqua !important;
                color: aqua;
                padding: 0px 28px;
            }
        }
    }
`;
