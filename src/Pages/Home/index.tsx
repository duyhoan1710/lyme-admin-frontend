import React, { useEffect, useState } from "react";
import { INTRO } from "src/Constants";
import styled from "styled-components";
import { socket } from "src/Utils/socket";

const newSocket = socket();

export const Home = () => {
    const [sk] = useState(newSocket.init());
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
            <p className="intro" onClick={onClick}>
                {INTRO}
            </p>
        </StyledHome>
    );
};

const StyledHome = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .intro {
        font-size: 25px;
        color: #2a2550;
    }
`;
