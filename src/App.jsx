import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import OrderProvider from "./store/OrderProvider";
import HistoryProvider from "./store/HistoryProvider";
import IntroPage from "./pages/IntroPage";
import HomePage from "./pages/HomePage";
import EventSettingsPage from "./pages/EventSettingsPage";
import ChooseStylePage from "./pages/ChooseStylePage";
import ChooseDishesPage from "./pages/ChooseDishesPage";
import ChooseServiceFormatPage from "./pages/ChooseServiceFormatPage";
import PaymentPage from "./pages/PaymentPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import OrdersPage from "./pages/OrdersPage";
import CatalogPage from "./pages/CatalogPage";
import DishPage from "./pages/DishPage";
import FinalPage from "./pages/FinalPage";
import NotFoundPage from "./pages/NotFoundPage";
import { CatalogProvider } from "./catalogContext.jsx";

// HashRouter: GitHub Pages не умеет отдавать index.html на вложенные пути,
// поэтому весь маршрут держим в хеше — сервер его никогда не видит.
const router = createHashRouter([
  { path: "/", element: <Navigate to="/intro" replace /> },
  { path: "/intro", element: <IntroPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/event", element: <EventSettingsPage /> },
  { path: "/style", element: <ChooseStylePage /> },
  { path: "/menu", element: <ChooseDishesPage /> },
  { path: "/format", element: <ChooseServiceFormatPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/tracking", element: <OrderTrackingPage /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/orders/:orderId", element: <OrderStatusPage /> },
  { path: "/catalog", element: <CatalogPage /> },
  { path: "/dish/:dishId", element: <DishPage /> },
  { path: "/done", element: <FinalPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  return (
    <OrderProvider>
      <CatalogProvider>
        <HistoryProvider>
          <RouterProvider router={router} />
        </HistoryProvider>
      </CatalogProvider>
    </OrderProvider>
  );
}

export default App;
