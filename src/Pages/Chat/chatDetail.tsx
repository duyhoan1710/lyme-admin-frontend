import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { socket } from "src/Utils/socket";
import { Button, Input } from "antd";
import { IMessage } from "@interfaces";
import { MenuLeft } from "./menuLeft";
import { useParams } from "react-router-dom";
import { useProfile } from "src/hooks/useProfile";

const newSocket = socket();

export const ChatDetail = () => {
    const { data: profile } = useProfile();

    const [sk] = useState(newSocket.init());
    const [listMessage, setListMessage] = useState<IMessage[]>([]);
    const [message, setMessage] = useState("");
    const { chatType, chatId }: { chatType: "dm" | "room"; chatId: string } = useParams();

    const msgRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (chatType === "room") {
            sk.emit("joinRoom", { chatId, chatType });
            sk.on("joinedRoom", (payload) => {
                console.log(payload);
            });
        }

        sk.emit("getMessages", { chatId, chatType });
        sk.on("gotMessages", (payload) => {
            setListMessage(payload);
        });

        return () => {
            sk.off("joinedRoom");
            sk.off("gotMessages");
        };
    }, [chatType, chatId]);

    useEffect(() => {
        sk.on("sendedMessage", (payload) => {
            setListMessage((preValue) => [...preValue, payload]);
        });

        return () => {
            sk.off("sendedMessage");
        };
    }, []);

    useEffect(() => {
        if (msgRef.current) {
            msgRef.current.scrollTo({
                top: msgRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [listMessage]);

    const sendMessage = () => {
        const mgs = message.trim();

        if (mgs) {
            sk.emit("sendMessage", { chatType, content: mgs, chatId });
            setListMessage((preValue) => [
                ...preValue,
                { content: mgs, room_id: chatId, sender_id: profile.id },
            ]);
            setMessage("");
        }
    };

    const onKeyDown = (e: any) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <StyleChatDetail>
            <div className="left-block">
                <MenuLeft />
            </div>

            <div className="right-block">
                <div className="msg-list">
                    <div className="wrap-msg" ref={msgRef}>
                        {listMessage?.length ? (
                            listMessage?.map((message: IMessage, index) => (
                                <div
                                    key={index}
                                    className={`${
                                        profile.id === message.sender_id
                                            ? "sender-message"
                                            : "receiver-message"
                                    } message`}
                                >
                                    {message.content}
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="msg-form">
                    <Input
                        value={message}
                        className="mgs-input"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                    <Button className="mgs-btn" onClick={sendMessage}>
                        Send Message
                    </Button>
                </div>
            </div>
        </StyleChatDetail>
    );
};

const StyleChatDetail = styled.div`
    display: flex;
    height: 100%;

    .left-block {
        width: 25%;
    }

    .right-block {
        flex-grow: 1;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        .msg-list {
            flex-grow: 1;
            padding: 20px;

            .wrap-msg {
                height: 75vh;
                overflow-y: auto;
            }

            .message {
                background-color: #e4e6eb;
                width: fit-content;
                padding: 4px 8px;
                border-radius: 10px;
                margin: 4px;
                max-width: 500px;
                word-break: break-word;
            }

            .sender-message {
                margin-left: auto;
            }

            .receiver-message {
            }
        }

        .msg-form {
            display: flex;
        }
    }
`;
