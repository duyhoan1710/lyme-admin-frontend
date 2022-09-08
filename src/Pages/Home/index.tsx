import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "src/Utils/socket";
import { Button, Image, Input } from "antd";

const newSocket = socket();

interface IUser {
    id: string;
    name: string;
}

export const Home = () => {
    const [sk] = useState(newSocket.init());
    const [username, setUsername] = useState<IUser>();
    const [listUser, setListUser] = useState<IUser[]>([]);

    const onClick = () => {
        sk.emit("send-message", "test");
    };
    useEffect(() => {
        sk.emit("send-message", "hello");

        sk.on("receive-message", (payload) => {
            console.log("abc", payload);
        });

        return () => {
            sk.off("receive-message");
        };
    }, []);

    return (
        <StyledHome>
            <div className="left-block">
                <div className="form-name">
                    <Input
                        className="input-name"
                        placeholder="username"
                        // onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button className="btn-submit">submit</Button>
                </div>

                <div className="list-user">
                    <div className="title">List User</div>
                    {listUser?.length
                        ? listUser?.map((user: IUser) => (
                              <div key={user.id} className="user">
                                  <Image className="image-user" />
                                  <div>{user.name}</div>
                              </div>
                          ))
                        : ""}
                </div>
            </div>

            <div className="right-block"></div>
        </StyledHome>
    );
};

const StyledHome = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .intro {
        font-size: 25px;
        color: #2a2550;
    }

    .left-block {
        width: 25%;
        height: 100%;
        border: 1px solid black;
        padding: 6px;

        .form-name {
            display: flex;

            .input-name {
                margin-right: 15px;
            }
        }

        .list-user {
            .title {
                font-size: 18px;
                margin-top: 12px;
            }

            .user {
                display: flex;

                .image-user {
                    margin-right: 20px;
                }
            }
        }
    }

    .right-block {
        flex-grow: 1;
        height: 100%;
        border: 1px solid black;
    }
`;
