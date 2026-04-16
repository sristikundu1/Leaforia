import { createBrowserRouter } from "react-router";
import HomeLayout from "./../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import AuthLayout from "../layouts/AuthLayout";
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
import AllDeliveries from "../pages/Dashboard/AllDeliveries/AllDeliveries";
import ManageOrders from "../pages/Dashboard/ManageOrders/ManageOrders";
import PaymentSuccess from "./../pages/Dashboard/PaymentSuccess/PaymentSuccess";
import MyPayments from "../pages/Dashboard/MyPayments/MyPayments";
import OrderTracking from "./../pages/Dashboard/OrderTracking/OrderTracking";
import PaymentCanceled from "../pages/Dashboard/PaymentCanceled/PaymentCanceled";
import AddArticle from "../pages/Dashboard/AddArticles/AddArticles";
import WishPlant from "../pages/WishPlant/WishPlant";
import Guides from "../pages/Guides/Guides";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import ContactUs from "../pages/ContactUs/ContactUs";
import FAQ from "../pages/FAQ/FAQ";
import PolicyPage from "../pages/PolicyPage/PolicyPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
        path: "/plants",
        element: <Plants></Plants>,
      },
      {
        path: "/plant/:id",
        element: (
          <PrivateRoute>
            <PlantDetails></PlantDetails>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/plants/${params.id}`);
          return res.json();
        },
        hydrateFallbackElement: <Loading />,
      },

      {
        path: "/article/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails></ArticleDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/wishPlants",
        element: <WishPlant></WishPlant>,
      },
      {
        path: "/guides",
        loader: () => fetch("/plantCare.json"),
        element: <Guides></Guides>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/faq",
        element: <FAQ></FAQ>,
      },
      {
        path: "/policy",
        element: <PolicyPage></PolicyPage>,
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
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "add-plants",
        element: (
          <AdminRoute>
            <AddPlant></AddPlant>
          </AdminRoute>
        ),
      },
      {
        path: "all-plants",
        element: (
          <AdminRoute>
            <AllPlants></AllPlants>
          </AdminRoute>
        ),
      },
      {
        path: "add-articles",
        element: (
          <AdminRoute>
            <AddArticle></AddArticle>
          </AdminRoute>
        ),
      },
      {
        path: "edit-plant/:id",
        element: (
          <AdminRoute>
            <UpdatePlant></UpdatePlant>
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders></ManageOrders>
          </AdminRoute>
        ),
      },
      {
        path: "all-deliveries",
        element: (
          <AdminRoute>
            <AllDeliveries></AllDeliveries>
          </AdminRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-canceled",
        element: <PaymentCanceled></PaymentCanceled>,
      },
      {
        path: "order-tracking",
        element: <OrderTracking></OrderTracking>,
      },
      {
        path: "my-payments",
        element: <MyPayments></MyPayments>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
