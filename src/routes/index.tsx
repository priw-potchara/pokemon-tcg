import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/main";

export default function CoreRouter() {
    //==============================
    const basePath = process.env.REACT_APP_BASE_PATH || "/";
    //==============================

    return (
        <BrowserRouter basename={basePath}>
            <Routes>
                {/* ==================== */}
                <Route path="/" element={<MainPage />} />
                {/* ==================== */}
                <Route path="" element={<Navigate to={`/`} />} />
                <Route path="*" element={<Navigate to={`/`} />} />
                {/* ==================== */}
            </Routes>
        </BrowserRouter>
    );
}
