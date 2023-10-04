// App.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Selection from "./views/Selection";
import Playing from "./views/Playing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/selection",
    element: <Selection />,
  },
  {
    path: "/playing/:idMonster",
    element: <Playing />,
  },
]);

export default router;
