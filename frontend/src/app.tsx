import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateUserPage } from "./pages/create-user";
import { HomePage } from "./pages/home";
import { ReportPage } from "./pages/report";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/user/create",
        element: <CreateUserPage />,
    },
    {
        path: "/report",
        element: <ReportPage />,
    },
    {
        path: "/",
        element: <HomePage />,
    },
]);

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NotificationsProvider>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    <RouterProvider router={router} />
                </MantineProvider>
            </NotificationsProvider>
        </QueryClientProvider>
    );
}
