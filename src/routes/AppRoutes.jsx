// rafce
import { Routes, Route, Navigate } from "react-router-dom"

// Main Routes
import HomePage from "../pages/main/home/HomePage"
import LoginPage from "../pages/main/auth/LoginPage"

const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
export default AppRoutes