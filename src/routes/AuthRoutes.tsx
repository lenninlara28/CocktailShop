import { Login, SignUp } from "@pages";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route path="sign-up" element={<SignUp />} />

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AuthRoutes;
