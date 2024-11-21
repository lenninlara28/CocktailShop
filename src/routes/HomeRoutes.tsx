import { Home } from "@pages";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AuthRoutes;
