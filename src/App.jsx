import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import OrderProvider from "./store/OrderProvider";
import HistoryProvider from "./store/HistoryProvider";
import SupplyProvider from "./store/SupplyProvider";
import IntroPage from "./pages/IntroPage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import FinalPage from "./pages/FinalPage";
import OrdersPage from "./pages/OrdersPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import NotFoundPage from "./pages/NotFoundPage";

// HashRouter: GitHub Pages не умеет отдавать index.html на вложенные пути,
// поэтому весь маршрут держим в хеше — сервер его никогда не видит.
const router = createHashRouter([
  { path: "/", element: <Navigate to="/intro" replace /> },
  { path: "/intro", element: <IntroPage /> },
  { path: "/collection", element: <CatalogPage /> },
  { path: "/product/:productId", element: <ProductPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/done", element: <FinalPage /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/orders/:orderId", element: <OrderStatusPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  return (
    <OrderProvider>
      <SupplyProvider>
        <HistoryProvider>
          <RouterProvider router={router} />
        </HistoryProvider>
      </SupplyProvider>
    </OrderProvider>
  );
}

export default App;
