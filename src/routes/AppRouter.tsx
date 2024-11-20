import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes.tsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
