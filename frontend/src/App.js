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
import { Home } from "./Home";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/activate/:uid/:token" element={<AccountActivation />} />
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
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
