import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@mantine/core/styles.css';

// Pages
import Login from './pages/Login';
import Profile from './pages/Profile';
import Inquiries from './pages/Inquiries';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import { MantineProvider } from '@mantine/core';
import EWallet from './pages/EWallet';
import GatePasses from './pages/GatePasses';
import MedicalProfile from './pages/MedicalProfile';
import FeedbackInquiry from './pages/FeedbackInquiry';
import FoodOrder from './pages/FoodOrder';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/medical-profile",
        element: <MedicalProfile />
      },
      {
        path: "/gate-passes",
        element: <GatePasses />
      },
      {
        path: "/e-wallet",
        element: <EWallet />
      },
      {
        path: "/feedback",
        element: <FeedbackInquiry />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/food-order",
        element: <FoodOrder />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/error",
    element: <Error />
  }
]);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
