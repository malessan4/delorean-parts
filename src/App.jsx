import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BuyerHome from "./pages/BuyerHome";
import SellerHome from "./pages/SellerHome";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
    </Router>
  );
}

export default App;