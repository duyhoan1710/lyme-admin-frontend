import { EAppRoutes } from "@enums";
import { IRoute } from "@interfaces";
import { Home } from "@pages";

export const routes: Array<IRoute> = [
    { path: EAppRoutes.PATH_HOME, component: Home, exact: true },
];
