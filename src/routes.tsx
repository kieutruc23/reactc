import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutSite from "./layouts/LayoutSite";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/products/ProductList";
import ProductAdd from "./pages/admin/products/ProductAdd";
import ProductEdit from "./pages/admin/products/ProductEdit";
import PageNotFound from "./pages/PageNotFound";
import SigninPage from "./pages/SigninPage";
import About from "./pages/About";
import SignupPage from "./pages/SignupPage";
import CategoryList from "./pages/admin/categories/CategoryList";
import CategoryAdd from "./pages/admin/categories/CategoryAdd";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";
import Checkout from "./pages/Checkout";
import ProtectedAdminRoute from "./pages/PriveRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutSite />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <About /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductDetailPage /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute
        isAuthenticated={true}
        userRole="admin"
        element={<LayoutAdmin />}
      />
      ),
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "products",
        children: [
          { index: true, element: <Navigate to="list" /> },
          { path: "list", element: <ProductList /> },
          { path: "add", element: <ProductAdd /> },
          { path: ":id/edit", element: <ProductEdit /> },
        ],
      },
      {
        path: "categories",
        children: [
          { index: true, element: <Navigate to="list" /> },
          { path: "list", element: <CategoryList /> },
          { path: "add", element: <CategoryAdd /> },
          { path: ":id/edit", element: <CategoryEdit /> },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/**",
    element: <PageNotFound />,
  },
]);
