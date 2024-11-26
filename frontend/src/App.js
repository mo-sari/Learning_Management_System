import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CreateNewPassword,
  ForgotPassword,
  Login,
  Logout,
  Register,
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
        </Routes>
      </MainWrapper>
      <h1>hello</h1>
    </BrowserRouter>
  );
}

export default App;
