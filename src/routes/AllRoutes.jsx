import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Stock from "../pages/Stock";
import AddInventory from "../pages/AddInventory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "stock",
        element: <Stock />,
      },
      {
        path: "add",
        element: <AddInventory />,
      },
    ],
  },
]);

export default function AllRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
