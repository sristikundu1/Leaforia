import { createBrowserRouter } from "react-router";
import HomeLayout from "./../layouts/HomeLayout";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
]);
