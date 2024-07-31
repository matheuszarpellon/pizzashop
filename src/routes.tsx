import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard";
import { SignIn } from "./pages/auth/sign-in";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Router } from "@remix-run/router";
import { SignUp } from "./pages/auth/sign-up";
import { Orders } from "./pages/app/orders/orders";

export const router: Router = createBrowserRouter([

  { path: "/", element: <AppLayout />, children: [
    { path: "/", element: <Dashboard /> },
    { path: "/orders", element: <Orders /> }
  ] },
  {
    path: "/", element: <AuthLayout />, children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> }
    ]
  },
  { path: "/sign-in", element: <SignIn /> }
])