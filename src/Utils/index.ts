export * from "./theme";
export * from "./storage";

export function randomString(length = 6) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function formatVND(value: number | string | undefined) {
    return Number(value).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export function getImage(value: string) {
    return `${process.env.REACT_APP_API_URL}/files/${value}`;
}

export function formatNumber (value: string | number) {
    return value.toString().replaceAll('.', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

