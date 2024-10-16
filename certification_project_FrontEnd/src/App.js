import SignIn from "./pages/Login/SignIn";
import Loading from "./components/loading";
import SnackBar from './components/snackBar';
import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/dashboard/dashboard'; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Loading />
      <SnackBar />
    </>
  );
}
