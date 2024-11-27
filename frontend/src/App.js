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
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
