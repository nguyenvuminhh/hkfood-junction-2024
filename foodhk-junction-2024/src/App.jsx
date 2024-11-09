import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from "./components/product/ProductForm";
import MainLayout from './components/main pages/MainLayout'; // Import MainLayout
import Preproduction from "./components/monitor/Preproduction";
import { ProgressProvider, useProgress } from './context/ProgressContext';

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/monitor" element={<Preproduction />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
