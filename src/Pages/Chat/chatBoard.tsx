import styled from "styled-components";
import { MenuLeft } from "./menuLeft";

export const ChatBoard = () => {
    return (
        <StyleChatBoard>
            <div className="left-block">
                <MenuLeft />
            </div>

            <div className="right-block">
                <div className="description">Select User To Start a Chat</div>
            </div>
        </StyleChatBoard>
    );
};

const StyleChatBoard = styled.div`
    display: flex;
    height: 100%;

    .left-block {
        width: 25%;
    }

    .right-block {
        flex-grow: 1;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;

        .description {
            font-size: 20px;
        }
    }
`;
