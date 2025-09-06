import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg"; // <-- coloca tu PNG aquí

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "gerencia",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      gerencia: { email: "gerencia@ecua.com", password: "gerencia123" },
      recepcion: { email: "recepcion@ecua.com", password: "recepcion123" },
      tecnico: { email: "tecnico@ecua.com", password: "tecnico123" },
      ventas: { email: "ventas@ecua.com", password: "ventas123" },
    };

    const roleCreds = credentials[formData.role];

    if (formData.email === roleCreds.email && formData.password === roleCreds.password) {
      alert(`¡Login exitoso como ${formData.role}!`);
      navigate(`/${formData.role}`);
    } else {
      alert("Credenciales incorrectas. Revisa tu email y contraseña.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Logo y fondo */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 items-center justify-center">
        <img src={Logo} alt="Ecuatechnology Logo" className="w-3/4" />
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login Administrativo
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Selecciona tu rol *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gerencia">Gerencia</option>
                <option value="recepcion">Recepción</option>
                <option value="tecnico">Técnico</option>
                <option value="ventas">Área de Ventas</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="usuario@empresa.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              <LogIn size={18} />
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              ¿Olvidaste tu contraseña?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Recuperar
              </a>
            </p>
            <p>
              ¿No tienes cuenta?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
