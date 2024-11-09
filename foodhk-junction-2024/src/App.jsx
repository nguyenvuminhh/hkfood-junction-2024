import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from "./components/product/ProductForm";
import MainLayout from './components/main pages/MainLayout'; // Import MainLayout
import { ProgressProvider, useProgress } from './context/ProgressContext';

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/product-form" element={<ProductForm />} />
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
