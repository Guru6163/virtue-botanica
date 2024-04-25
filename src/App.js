// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx"
import Layout from "./layout/Layout.jsx"
import Orders from './pages/Orders.jsx';
import CreateOrder from './pages/CreateOrder.jsx';
import Products from './pages/Products.jsx';
import Invoice from './pages/Invoice.jsx';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';





function App() {
  return (
    <PrimeReactProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<Invoice />} />
          <Route path="create-order" element={<CreateOrder />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </PrimeReactProvider>


  );
}

export default App;
