import { createBrowserRouter } from "react-router";
import HomeLayout from "./../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../contexts/PrivateRoute";
import Loading from "../components/Loading/Loading";
import Profile from "../pages/Profile/Profile";
import Plants from "../pages/Plants/Plants";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import AboutUs from "../pages/AboutUs/AboutUs";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPlant from "../pages/Dashboard/AddPlant/AddPlant";
import AllPlants from "../pages/Dashboard/AllPlants/AllPlants";
import UpdatePlant from "./../pages/Dashboard/UpdatePlant/UpdatePlant";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
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
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/plants",
    loader: () => fetch("/plants.json"),
    element: <Plants></Plants>,
    hydrateFallbackElement: <Loading />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-plants",
        element: <AddPlant></AddPlant>,
      },
      {
        path: "all-plants",
        element: <AllPlants></AllPlants>,
      },
      {
        path: "edit-plant/:id",
        element: <UpdatePlant></UpdatePlant>,
      },
      {
        path: "user-management",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
