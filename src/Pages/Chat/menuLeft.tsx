import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "src/Utils/socket";
import { Button, Input } from "antd";
import { IRoom, IUser } from "@interfaces";
import { useHistory } from "react-router-dom";

const newSocket = socket();

export const MenuLeft = () => {
    const [sk] = useState(newSocket.init());
    const [listUser, setListUser] = useState<IUser[]>([]);
    const [listRoom, setListRoom] = useState<IRoom[]>([]);

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
                          </div>
                      ))
                    : ""}
            </div>
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
            .name {
                cursor: pointer;
                padding: 4px 10px;
            }
        }
    }
`;
