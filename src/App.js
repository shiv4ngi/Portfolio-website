import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { PortfolioProvider } from "./context/PortfolioContext";

function App() {
  return (
    <PortfolioProvider>
      <Box sx={{ minHeight: "100vh" }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Box>
    </PortfolioProvider>
  );
}

export default App;
