import dayjs from "dayjs";

export const formatDateTime = (value?: Date | string, format?: string) => {
    return dayjs(value || new Date()).format(format || "DD-MM-YYYY HH:mm");
};

export const formatDate = (value?: any, format?: string) => {
    return dayjs(value || new Date()).format(format || "YYYY-MM-DD");
};
