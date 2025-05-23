import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyerHome from "./pages/BuyerHome";
import SellerHome from "./pages/SellerHome";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute allowedRoles={["buyer", "guest"]}>
                            <BuyerHome />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/seller"
                    element={
                        <ProtectedRoute allowedRoles={["seller"]}>
                            <SellerHome />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}