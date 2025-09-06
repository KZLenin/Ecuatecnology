import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

// Pantallas vacías para cada rol (para pruebas)
const GerenciaPage = () => <h2 className="p-8 text-xl">Bienvenido Gerencia</h2>;
const RecepcionPage = () => <h2 className="p-8 text-xl">Bienvenido Recepción</h2>;
const TecnicoPage = () => <h2 className="p-8 text-xl">Bienvenido Técnico</h2>;
const VentasPage = () => <h2 className="p-8 text-xl">Bienvenido Área de Ventas</h2>;

// Componente de ruta privada
const PrivateRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal = Login */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={`/${userRole}`} replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* Rutas privadas para cada rol */}
        <Route
          path="/gerencia"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <GerenciaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recepcion"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <RecepcionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tecnico"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <TecnicoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ventas"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <VentasPage />
            </PrivateRoute>
          }
        />

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
