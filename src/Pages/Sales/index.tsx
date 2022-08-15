import { Button, Table, Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { ButtonAddStyle } from "src/Components/Common/button";
import { ModalCreateSale } from "./create";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSales } from "src/hooks/useSales";
import { ModalUpdateSale } from "./update";
import { ISale } from "@interfaces";
import { deleteSale } from "src/services/sales";
import { formatDate } from "src/Utils/dateTime";

export const Sales = () => {
    const queryClient = useQueryClient();

    const [dataColumns, setDataColumns] = useState<DataType[]>();
    const [isOpenModalCreateSale, setIsOpenCreateSale] = useState(false);
    const [idUpdateSale, setIdUpdateSale] = useState<number>();
    const [idDeleteSale, setIdDeleteSale] = useState<number>();
    const [page, setPage] = useState(1);

    const { data, isLoading } = useSales({ page });

    const { mutate: handleDeleteSale } = useMutation(() => deleteSale({ id: idDeleteSale }), {
        onSuccess: async () => {
            await queryClient.invalidateQueries(["SALES"]);
            setIdDeleteSale(undefined);
        },
        onError: () => {
            console.log("error");
        },
    });

    interface DataType extends ISale {
        key: React.Key;
        action: React.ReactElement;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: "Id",
            dataIndex: "key",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            render: (value) => formatDate(value),
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            render: (value) => formatDate(value),
        },
        {
            title: "Description",
            dataIndex: "description",
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
                            <Button type="primary" onClick={() => setIdUpdateSale(el.id)}>Sửa</Button>
                            <Button onClick={() => setIdDeleteSale(el.id)}>Xóa</Button>
                        </div>
                    ),
                }))
            );
        }
    }, [data]);

    return (
        <StyledSale>
            <div className="add-more-button">
                <ButtonAddStyle onClick={() => setIsOpenCreateSale(true)}>Thêm Mới</ButtonAddStyle>
                <ModalCreateSale
                    isModalVisible={isOpenModalCreateSale}
                    handleCancel={() => setIsOpenCreateSale(false)}
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

            {idUpdateSale && (
                <ModalUpdateSale
                    isModalVisible={!!idUpdateSale}
                    handleCancel={() => setIdUpdateSale(undefined)}
                    data={data?.result?.find((el) => el.id === idUpdateSale)}
                />
            )}

            <Modal
                title="Xóa đợt Sale"
                visible={!!idDeleteSale}
                onOk={() => handleDeleteSale()}
                onCancel={() => setIdDeleteSale(undefined)}
                okText="Đồng ý"
                cancelText="Đóng"
            >
                Bạn có chắc chắn muốn xóa ?
            </Modal>
        </StyledSale>
    );
};

const StyledSale = styled.div`
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
