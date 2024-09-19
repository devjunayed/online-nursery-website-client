import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import CreateCategory from "../components/Dashboard/Category/CreateCategory";
import ManageCategory from "../components/Dashboard/Category/ManageCategory";
import CreateProducts from "../components/Dashboard/Products/CreateProducts";
import ManageProducts from "../components/Dashboard/Products/ManageProducts";

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
                path: '/dashboard/create-products',
                element: <CreateProducts />
            },
            {
                path: '/dashboard/manage-products',
                element: <ManageProducts />
            },
            {
                path: '/dashboard/create-category',
                element: <CreateCategory />
            },
            {
                path: '/dashboard/manage-category',
                element: <ManageCategory />
            },
        ]
    }
])

export default router;