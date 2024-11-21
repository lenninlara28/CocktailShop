import { Home, DetailsCocktail, DetailsIngredients } from "@pages";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/cocktail/:id" element={<DetailsCocktail />} />
      <Route path="/details/ingredients/:id" element={<DetailsIngredients />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AuthRoutes;
