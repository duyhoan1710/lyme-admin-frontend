import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";

import type { MenuProps } from "antd";

import { ILayout } from "@interfaces";
import { LayoutStyle } from "./styles";
import { EAppRoutes } from "@enums";
import { useHistory, useLocation } from "react-router-dom";
import { setToken } from "@utils";

const { Header, Sider, Content } = Layout;

export const AppLayout = (props: ILayout) => {
    const { children } = props;
    const history = useHistory();
    const { pathname } = useLocation();

    const onClick: MenuProps["onClick"] = (e) => {
        history.push(e.key);
    };

    const logout = () => {
        setToken("");
        history.push("/login");
    };

    const dropdownProfile = (
        <Menu
            items={[
                {
                    key: "1",
                    label: "Profile",
                },
                {
                    key: "3",
                    label: "Setting",
                },
                {
                    key: "4",
                    danger: true,
                    label: "Logout",
                    onClick: logout,
                },
            ]}
        />
    );

    return (
        <LayoutStyle>
            <Sider
                trigger={null}
                collapsible
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo">
                    <i>Lyme Admin</i>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={onClick}
                    selectedKeys={[pathname]}
                    items={[
                        {
                            key: EAppRoutes.CATEGORY,
                            icon: <UserOutlined />,
                            label: "Loại Sản Phẩm",
                        },
                        {
                            key: EAppRoutes.SALES,
                            icon: <UserOutlined />,
                            label: "Đợt Sale",
                        },
                        {
                            key: EAppRoutes.PRODUCT,
                            icon: <VideoCameraOutlined />,
                            label: "Sản Phẩm",
                        },
                        {
                            key: EAppRoutes.ORDER,
                            icon: <UploadOutlined />,
                            label: "Đơn Hàng",
                        },
                        {
                            key: EAppRoutes.EVALUATE,
                            icon: <UploadOutlined />,
                            label: "Đánh Giá - Bình Luận",
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header
                    className="site-layout-background"
                    style={{ padding: "0 16px", display: "flex", justifyContent: "flex-end" }}
                >
                    <div>
                        <span>Xin Chào Admin</span>
                        <Dropdown overlay={dropdownProfile} placement="bottom" arrow>
                            <a onClick={(e) => e.preventDefault()}>
                                <Avatar
                                    style={{
                                        color: "#f56a00",
                                        backgroundColor: "#fde3cf",
                                        marginLeft: 10,
                                        marginRight: 5,
                                        cursor: "pointer",
                                    }}
                                >
                                    AD
                                </Avatar>
                            </a>
                        </Dropdown>
                    </div>
                </Header>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: "calc(100vh - 112px)",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </LayoutStyle>
    );
};
