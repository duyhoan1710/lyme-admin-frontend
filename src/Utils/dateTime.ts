import dayjs from "dayjs";

export const formatDateTime = (value?: Date | string, format?: string) => {
    return dayjs(value || new Date()).format(format || "DD-MM-YYYY HH:mm");
};
