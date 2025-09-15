import { LogIn } from "lucide-react";
import Logo from "../assets/logo.jpg"; // <-- coloca tu PNG aquí

import { useForm } from 'react-hook-form'
import {useFetch} from '../hooks/useFetch'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

import storeAuth from "../context/storeAuth";


const LoginPage = () => {
  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fetchDataBackend = useFetch();
  const { setRol } = storeAuth();

  const loginUser = async (dataForm) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
      // ⚠️ No guardamos token aún, solo el rol
      const response = await fetchDataBackend(url, dataForm, "POST");

      if (response?.rol) {
        setRol(response.rol);
        navigate("/otp");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Logo y fondo */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br items-center justify-center">
        <img src={Logo} alt="Ecuatechnology Logo" className="w-3/4" />
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Iniciar sesión
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit(loginUser)}>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Selecciona tu rol <span className="text-red-800">*</span>
              </label>
              
              <select
                id="role"
                name="role"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("role", { required: "Selecciona un rol" })}
              >
                <option value="gerencia">Gerencia</option>
                <option value="recepcion">Recepción</option>
                <option value="tecnico">Técnico</option>
                <option value="ventas">Área de Ventas</option>
              </select>
              {errors.role && <p className="text-red-800">{errors.role.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico <span className="text-red-800">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="usuario@empresa.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: "El correo es obligatorio" })}
              />
               {errors.email && <p className="text-red-800">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña <span className="text-red-800">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="********"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", { required: "La contraseña es obligatoria" })}
              />
              {errors.password && <p className="text-red-800">{errors.password.message}</p>}
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
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Recuperar
              </a>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
