import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import CreateCategory from "../components/Dashboard/Category/CreateCategory";
import ManageCategory from "../components/Dashboard/Category/ManageCategory";
import CreateProducts from "../components/Dashboard/Products/CreateProducts";
import ManageProduct from "../components/Dashboard/Products/ManageProduct";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";

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
                element: <ProductsPage />
            },
            {
                path: '/products/:id',
                element: <ProductDetailPage />,
                loader: ({params}) => params
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
                element: <ManageProduct />
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