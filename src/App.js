import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductForm from "./component/ProductForm";
import ProductListing from "./component/ProductListing";
import Login from "./component/Login";
import Register from "./component/Register";
import ProductDetail from "./component/ProductDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product/create" element={<ProductForm />} />
        <Route path="/product/:id/edit" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/user/login" element={<Login />} id='login' />
        <Route path="/user/create" element={<Register />} id='register' />
        <Route path="*" element={<ProductListing />} id="home" />
      </Routes>
    </Router>
  );
};

export default App;
