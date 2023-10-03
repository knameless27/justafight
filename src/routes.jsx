// App.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Selection from "./views/Selection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/selection",
    element: <Selection />,
  },
]);

export default router;
