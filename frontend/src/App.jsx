import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProfeDashboard from "./pages/ProfeDashboard.jsx";
import AlumnoDashboard from "./pages/AlumnDashboard.jsx";
import PrivateRoute from "./routes/privateRoute.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/admin"
        element={
          <PrivateRoute allowedRoles={["ADMINISTRADOR"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/profe"
        element={
          <PrivateRoute allowedRoles={["PROFESOR"]}>
            <ProfeDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/alumn"
        element={
          <PrivateRoute allowedRoles={["ALUMNO"]}>
            <AlumnoDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={user ? <Login /> : <Login />} // Redirigir según el estado del usuario
      />
    </Routes>
  );
}

export default App;
