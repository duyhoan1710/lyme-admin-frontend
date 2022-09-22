import { ChatBoard } from "./../Pages/Chat/chatBoard";
import { Evaluate } from "./../Pages/Evaluate/index";
import { Order } from "./../Pages/Order/index";
import { Product } from "./../Pages/Product/index";
import { Category } from "./../Pages/Category/index";
import { EAppRoutes } from "@enums";
import { IRoute } from "@interfaces";
import { Login } from "src/Pages/Auth/Login";
import { ChatDetail } from "src/Pages/Chat/chatDetail";

export const routes: Array<IRoute> = [
    { path: EAppRoutes.CHAT, component: ChatBoard, exact: true, auth: true },
    { path: EAppRoutes.CHAT_DETAIL, component: ChatDetail, exact: true, auth: true },
    { path: EAppRoutes.CATEGORY, component: Category, exact: true, auth: true },
    { path: EAppRoutes.PRODUCT, component: Product, exact: true, auth: true },
    { path: EAppRoutes.ORDER, component: Order, exact: true, auth: true },
    { path: EAppRoutes.EVALUATE, component: Evaluate, exact: true, auth: true },
    { path: EAppRoutes.LOGIN, component: Login, exact: true },
];
