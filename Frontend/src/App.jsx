import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import { Toaster } from 'sonner';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetails from "./pages/OrderDetails";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagment from "./components/Admin/UserManagment";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import { Provider } from "react-redux";
import store from "./redux/store";
import PaymentReturn from "./components/Cart/PaymentReturn";
import ProtectedRoute from "./components/Common/ProtectedRoute";

export default function App() {
  return (
    // Routes setup
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="Collections/:collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="orderDetails/:id" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
            <Route path="payment-return" element={<PaymentReturn />} />

          </Route>

          {/* Admin Layout */}
          <Route path="/admin"

            element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminHomePage/>}></Route>
            <Route path="users" element={<UserManagment/>}></Route>
            <Route path="products" element={<ProductManagement/>}></Route>
            <Route path="products/:id/edit" element={<EditProductPage/>}></Route>
            <Route path="orders" element={<OrderManagement/>}></Route>
            {/* */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
