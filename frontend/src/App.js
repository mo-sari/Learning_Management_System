import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CreateNewPassword,
  ForgotPassword,
  Login,
  Logout,
  Register,
  AccountActivation,
  PasswordChangeConfirmation,
} from "./views/auth";
import {
  Cart,
  Checkout,
  Home,
  Search,
  CourseDetail,
  Success,
} from "./views/base";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainWrapper>
          <Routes>
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />
            <Route
              path="/activate/:uid/:token"
              element={<AccountActivation />}
            />
            <Route path="/logout/" element={<Logout />} />
            <Route path="/forgot-password/" element={<ForgotPassword />} />
            <Route
              path="/password/reset/confirm/:uid/:token/"
              element={<CreateNewPassword />}
            />
            <Route
              path="/password-reset-complete/"
              element={<PasswordChangeConfirmation />}
            />

            {/* Courses Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/course-detail/:slug" element={<CourseDetail />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/checkout/" element={<Checkout />} />
          </Routes>
        </MainWrapper>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
