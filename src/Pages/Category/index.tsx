import { Button, Table, Image } from "antd";
import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { ButtonAddStyle } from "src/Components/Common/button";
import { ModalCreateCategory } from "./create";

export const Category = () => {
    interface DataType {
        key: React.Key;
        id: number;
        name: string;
        image: string;
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
            width: "250px",
            render: (value) => <Image src={value} width={90} height={60} preview={false} />
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "",
            dataIndex: "action",
            width: "180px",
        },
    ];

    const data: DataType[] = [
        {
            key: "1",
            id: 1,
            name: "John Brown",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSERP84zBqFN7MYx1wjq92ioyoXgpfeD2yy3g&usqp=CAU",
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button>Xóa</Button>
                </div>
            ),
        },
        {
            key: "2",
            id: 2,
            name: "Jim Green",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRBxMr2nwM0mEdR8XfIhAi8-1034_DN1nmpA&usqp=CAU",
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button>Xóa</Button>
                </div>
            ),
        },
        {
            key: "3",
            id: 3,
            name: "Joe Black",
            image: "https://toppng.com/uploads/preview/clothes-clothes-11563232177mtxhgfjrca.png",
            action: (
                <div className="action-column">
                    <Button type="primary">Sửa</Button>
                    <Button>Xóa</Button>
                </div>
            ),
        },
    ];

    const [isOpenModalCreateCategory, setIsOpenCreateCategory] = useState(false);

    return (
        <StyledCategory>
            <div className="add-more-button">
                <ButtonAddStyle onClick={() => setIsOpenCreateCategory(true)}>
                    Thêm Mới
                </ButtonAddStyle>
                <ModalCreateCategory
                    isModalVisible={isOpenModalCreateCategory}
                    handleCancel={() => setIsOpenCreateCategory(false)}
                />
            </div>

            <Table columns={columns} dataSource={data} size="middle" bordered />
        </StyledCategory>
    );
};

const StyledCategory = styled.div`
    .add-more-button {
        margin-bottom: 15px;
        display: flex;
        justify-content: flex-end;
    }

    .action-column {
        display: flex;
        justify-content: center;

        button {
            margin: 0 5px;
        }
    }
`;
