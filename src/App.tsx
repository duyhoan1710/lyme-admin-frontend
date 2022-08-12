import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { routes } from "src/Routers";
import { ComponentAppRoute } from "src/Components/AppRoutes";
import { IRoute } from "src/Interfaces";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
        },
    },
});

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Switch>
                        {routes.map((e: IRoute, key) => (
                            <ComponentAppRoute key={key} {...e} />
                        ))}
                    </Switch>
                </BrowserRouter>

                <ToastContainer />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
