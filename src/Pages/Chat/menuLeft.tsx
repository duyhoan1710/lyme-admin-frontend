import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "src/Utils/socket";
import { Button, Dropdown, Input, Menu, Modal, Select } from "antd";
import { IRoom, IUser } from "@interfaces";
import { useHistory } from "react-router-dom";
import { useUsers } from "src/hooks/useChat";
import debounce from "lodash.debounce";
const { Option } = Select;

const newSocket = socket();

export const MenuLeft = () => {
    const [sk] = useState(newSocket.init());
    const [listUser, setListUser] = useState<IUser[]>([]);
    const [listRoom, setListRoom] = useState<IRoom[]>([]);
    const [targetRoomId, setTargetRoomId] = useState<string>();
    const [targetUserIdAddToRoom, setTargetUserIdToRoom] = useState<string>();
    const [openModalInviteUser, setModalInviteUser] = useState(false);
    const [keySearchUser, setKeySearchUser] = useState("");

    const { data: users } = useUsers({ keySearch: keySearchUser });

    const history = useHistory();

    useEffect(() => {
        sk.emit("getRooms");
        sk.emit("getUsers");

        sk.on("gotRooms", (payload) => {
            setListRoom(payload);
        });
        sk.on("gotUsers", (payload) => {
            setListUser(payload);
        });

        return () => {
            sk.off("gotRooms");
            sk.off("gotUsers");
        };
    }, []);

    useEffect(() => {
        sk.on("invitedUser", () => {
            sk.emit("getRooms");
        });

        return () => {
            sk.off("invitedUser");
        };
    }, []);

    const handleSubmitInviteUser = () => {
        sk.emit("inviteUser", { chatId: targetUserIdAddToRoom, roomId: targetRoomId });
    };

    const menu = (
        <Menu
            items={[
                {
                    key: "1",
                    label: <div>invite user</div>,
                    onClick: () => setModalInviteUser(true),
                },
                {
                    key: "2",
                    label: <div>leave group</div>,
                },
            ]}
        />
    );

    const handleChange = (e: string) => {
        setTargetUserIdToRoom(e);
    };

    const handleSearch = debounce((e: string) => {
        setKeySearchUser(e);
    }, 300);

    return (
        <StyleMenuLeft>
            <div className="form-name">
                <Input className="input-name" placeholder="username" />
                <Button className="btn-submit">submit</Button>
            </div>

            <div className="list-user">
                <div className="title">List User</div>
                {listUser?.length
                    ? listUser?.map((user: IUser) => (
                          <div key={user.id} className="item">
                              <div
                                  className="name"
                                  onClick={() => history.push(`/chats/dm/${user.id}`)}
                              >
                                  {user.full_name}
                              </div>
                          </div>
                      ))
                    : ""}
            </div>

            <div className="list-room">
                <div className="title">List Room</div>
                {listRoom?.length
                    ? listRoom?.map((room: IRoom) => (
                          <div key={room.id} className="item">
                              <div
                                  className="name"
                                  onClick={() => history.push(`/chats/room/${room.id}`)}
                              >
                                  {room.name}
                              </div>

                              <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                                  <div className="setting" onClick={() => setTargetRoomId(room.id)}>
                                      ...
                                  </div>
                              </Dropdown>
                          </div>
                      ))
                    : ""}
            </div>

            <Modal
                title="Invite User To Group"
                visible={openModalInviteUser}
                onOk={handleSubmitInviteUser}
                onCancel={() => setModalInviteUser(false)}
            >
                <div className="input-name" style={{ marginBottom: "10px" }}>
                    Username or Email
                </div>
                <Select
                    showSearch
                    showArrow={false}
                    filterOption={false}
                    onChange={handleChange}
                    onSearch={handleSearch}
                    notFoundContent={null}
                    style={{ width: "100%" }}
                >
                    {users &&
                        users?.map((user: IUser) => (
                            <Option key={user.id}>
                                {user.full_name} - {user.email}
                            </Option>
                        ))}
                </Select>
            </Modal>
        </StyleMenuLeft>
    );
};

const StyleMenuLeft = styled.div`
    height: 100%;
    border: 1px solid black;
    padding: 6px;

    .form-name {
        display: flex;

        .input-name {
            margin-right: 15px;
        }
    }

    .list-user,
    .list-room {
        .title {
            font-size: 18px;
            margin-top: 12px;
        }

        .item {
            display: flex;
            justify-content: space-between;
            .name {
                cursor: pointer;
                padding: 4px 10px;
            }

            .setting {
                cursor: pointer;
                font-size: 18px;
                transform: rotate(90deg);
            }
        }
    }
`;
