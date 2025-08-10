import { Suspense, lazy, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Header from "./component/Header";
import Body from "./component/Body";
import Error from "./component/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ResturantMenu from "./component/ResturantMenu";


const Grocery = lazy(()=> import("./component/Grocery"))

const AppLayout = () => (
  <div className="App">
    <Header />
    <Outlet />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
    path: "/",
    element: <Body />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/grocery",
    element: <Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>,
  },
  {
    path: "/resturants/:resId",
    element: <ResturantMenu/>,
  },
],
errorElement: <Error/>
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
