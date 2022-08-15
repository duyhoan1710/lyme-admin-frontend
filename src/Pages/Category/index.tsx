import { Button, Table, Image, Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { ButtonAddStyle } from "src/Components/Common/button";
import { ModalCreateCategory } from "./create";
import { useCategory } from "src/hooks/useCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "src/services/category";
import { ModalUpdateCategory } from "./update";

export const Category = () => {
    const queryClient = useQueryClient();

    const [dataColumns, setDataColumns] = useState<DataType[]>();
    const [isOpenModalCreateCategory, setIsOpenCreateCategory] = useState(false);
    const [idRemoveCategory, setIdRemoveCategory] = useState<number>();
    const [idUpdateCategory, setIdUpdateCategory] = useState<number>();
    const [page, setPage] = useState(1);

    const { data, isLoading } = useCategory({ page });

    const { mutate: handleDeleteCategory } = useMutation(
        () => deleteCategory({ id: idRemoveCategory }),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["CATEGORIES"]);
                setIdRemoveCategory(undefined);
            },
            onError: () => {
                console.log("error");
            },
        }
    );

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
            dataIndex: "key",
        },
        {
            title: "Image",
            dataIndex: "image",
            width: "250px",
            render: (value) => <Image src={value} width={80} height={50} preview={false} />,
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "",
            dataIndex: "action",
            width: "150px",
        },
    ];

    useEffect(() => {
        if (data) {
            const result = [...data.result];
            setDataColumns(
                result.map((el, index) => ({
                    ...el,
                    key: index + 1,
                    action: (
                        <div className="action-column">
                            <Button type="primary" onClick={() => setIdUpdateCategory(el.id)}>Sửa</Button>
                            <Button onClick={() => setIdRemoveCategory(el.id)}>Xóa</Button>
                        </div>
                    ),
                }))
            );
        }
    }, [data]);

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

            <Table
                columns={columns}
                dataSource={dataColumns}
                size="middle"
                bordered
                pagination={false}
            />

            <div className="paginate">
                <Pagination
                    current={page}
                    total={data?.paging?.perPage ? Number(data?.paging?.perPage) : 0}
                    onChange={(_page) => setPage(_page)}
                    pageSize={20}
                />
            </div>

            {idUpdateCategory && (
                <ModalUpdateCategory
                    isModalVisible={!!idUpdateCategory}
                    handleCancel={() => setIdUpdateCategory(undefined)}
                    data={data?.result?.find((el) => el.id === idUpdateCategory)}
                />
            )}

            <Modal
                title="Xóa loại sản phẩm"
                visible={!!idRemoveCategory}
                onOk={() => handleDeleteCategory()}
                onCancel={() => setIdRemoveCategory(undefined)}
                okText="Đồng ý"
                cancelText="Đóng"
            >
                Bạn có chắc chắn muốn xóa ?
            </Modal>
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
