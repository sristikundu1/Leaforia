import { createBrowserRouter } from "react-router";
import HomeLayout from "./../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import Login from "../pages/Login/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register/Register";
import PrivateRoute from "../contexts/PrivateRoute";
import Loading from "../components/Loading/Loading";
import Profile from "../pages/Profile/Profile";
import Plants from "../pages/Plants/Plants";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import AboutUs from "../pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/plant/:id",
        loader: () => fetch("/plants.json"),
        element: (
          <PrivateRoute>
            <PlantDetails></PlantDetails>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },

      {
        path: "/article/:id",
        loader: () => fetch("/articles.json"),
        element: (
          <PrivateRoute>
            <ArticleDetails></ArticleDetails>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>
    ),
  },
  {
    path: "/plants",
    loader: () => fetch("/plants.json"),
    element: <Plants></Plants>,
    hydrateFallbackElement: <Loading />,
  },
  {
    path: "/about",
    element: <AboutUs></AboutUs>,
  },
]);
