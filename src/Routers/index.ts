import { Evaluate } from "./../Pages/Evaluate/index";
import { Order } from "./../Pages/Order/index";
import { Product } from "./../Pages/Product/index";
import { Category } from "./../Pages/Category/index";
import { EAppRoutes } from "@enums";
import { IRoute } from "@interfaces";
import { Home } from "@pages";
import { Sales } from "src/Pages/Sales";
import { Login } from "src/Pages/Auth/Login";

export const routes: Array<IRoute> = [
    { path: EAppRoutes.HOME, component: Home, exact: true, auth: true },
    { path: EAppRoutes.CATEGORY, component: Category, exact: true, auth: true },
    { path: EAppRoutes.PRODUCT, component: Product, exact: true, auth: true },
    { path: EAppRoutes.ORDER, component: Order, exact: true, auth: true },
    { path: EAppRoutes.EVALUATE, component: Evaluate, exact: true, auth: true },
    { path: EAppRoutes.SALES, component: Sales, exact: true, auth: true },
    { path: EAppRoutes.LOGIN, component: Login, exact: true },
];
