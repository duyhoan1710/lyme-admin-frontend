import { Evaluate } from './../Pages/Evaluate/index';
import { Order } from './../Pages/Order/index';
import { Product } from './../Pages/Product/index';
import { Category } from './../Pages/Category/index';
import { EAppRoutes } from "@enums";
import { IRoute } from "@interfaces";
import { Home } from "@pages";

export const routes: Array<IRoute> = [
    { path: EAppRoutes.HOME, component: Home, exact: true },
    { path: EAppRoutes.CATEGORY, component: Category, exact: true },
    { path: EAppRoutes.PRODUCT, component: Product, exact: true },
    { path: EAppRoutes.ORDER, component: Order, exact: true },
    { path: EAppRoutes.EVALUATE, component: Evaluate, exact: true },
];
