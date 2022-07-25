import { Redirect, Route } from "react-router-dom";

import { IRoute } from "@interfaces";
import { AppLayout } from "@layouts";
import { getToken } from "@utils";

export const ComponentAppRoute = (props: IRoute) => {
    // props
    const { path, exact, auth } = props;
    //page variable
    const Component = props.component;
    const Layout = props.layout || AppLayout;

    const token = getToken();
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                !!auth && !token ? (
                    <Redirect
                        to={{
                            pathname: "/sign-in",
                            state: { from: props.location },
                        }}
                    />
                ) : (
                    <Layout>
                        <Component />
                    </Layout>
                )
            }
        />
    );
};
