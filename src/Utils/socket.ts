import { io, Socket } from "socket.io-client";
import { getToken } from "./storage";

export const socket = () => {
    let instance: Socket | null;
    const initSk = (url = "", header?: any) =>
        io(`${process.env.REACT_APP_API_URL}/${url}`, {
            path: "/ws",
            extraHeaders: {
                Authorization: getToken(),
                ...header,
            },
        });
    const refresh = () => {
        if (instance) {
            instance.disconnect();
        }
        instance = null;
    };

    return {
        init: (url?: string, header?: any) => {
            if (!instance) instance = initSk(url, header);
            return instance;
        },
        refresh,
    };
};
