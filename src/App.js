import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/footer/Footer"
import Home from "./pages/Home";
import { productData } from "./api/api";
import ErrorDisplay from "./components/Error/ErrorDisplay";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import Cart from "./pages/Cart";
import Search from "./components/search";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={productData} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<ErrorDisplay />} /> {/* Catch-all route for 404 */}
      </Route>
    )
  );

  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
