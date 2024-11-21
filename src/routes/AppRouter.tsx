import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes.tsx";
import HomeRoutes from "./HomeRoutes.tsx";
import { Layout } from "@components";
import { useUserStore } from "@stores";

export const AppRouter = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const currentDummyUsers = useUserStore((state) => state.dummyUsers);
  const logOut = useUserStore(({ logOut }) => logOut);

  const logOutSession = () => {
    logOut({
      token: null,
      user: null,
      dummyUsers: currentDummyUsers,
    });
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/auth/*"
        element={
          <ProtecterRouter publicRouter>
            <AuthRoutes />
          </ProtecterRouter>
        }
      />

      <Route
        path="/home/*"
        element={
          <Layout user={user} logout={logOutSession}>
            <HomeRoutes />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

const ProtecterRouter = ({
  children,
  publicRouter = false,
}: {
  children: JSX.Element;
  publicRouter?: boolean;
}) => {
  const loggin = useUserStore(({ token }) => Boolean(token));
  if (publicRouter) {
    return loggin ? <Navigate to="/home" /> : children;
  }
  return !loggin ? <Navigate to="/auth/login" /> : children;
};
