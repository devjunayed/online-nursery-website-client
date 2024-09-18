import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard/manage-products',
                element: <div>manage products</div>
            },
            {
                path: '/dashboard/manage-category',
                element: <div>manage category</div>
            },
        ]
    }
])

export default router;