import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/loginPage/login';
import ManagerPage from './pages/Manager/ManagerPage/managerPage';
import CashierPage from './pages/Cashier/CashierPage/CashierPage';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/Manager" element={<ManagerPage />} />
        <Route path="/main/Cashier" element={<CashierPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
