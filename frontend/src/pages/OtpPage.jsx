import { ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Swal from "sweetalert2";
import storeAuth from "../context/storeAuth";

const OtpPage = () => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { setToken, rol } = storeAuth();
  const navigate = useNavigate();
  const fetchDataBackend = useFetch();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 6) {
      Swal.fire("Código incompleto", "Ingresa los 6 dígitos.", "warning");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/verify-otp`;
      const response = await fetchDataBackend(url, { otp: code }, "POST");

      if (response?.accessToken) {
        setToken(response.accessToken);

        // Redirección según el rol almacenado en Zustand
        switch (rol) {
          case "gerencia":
            navigate("/dashboardGerencia");
            break;
          case "recepcion":
            navigate("/dashboardRecepcion");
            break;
          case "tecnico":
            navigate("/dashboardTecnico");
            break;
          case "ventas":
            navigate("/dashboardVentas");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        Swal.fire("Error", "Código OTP incorrecto", "error");
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo verificar el código", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Verificación de Seguridad
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Ingresa el código de 6 dígitos que enviamos a tu correo.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength={1}
                value={otp[i]}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 border border-gray-300 text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <ShieldCheck size={18} />
            Verificar Código
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            ¿No recibiste el código?{" "}
            <button
              type="button"
              onClick={() => Swal.fire("Código reenviado", "Revisa tu correo", "info")}
              className="text-blue-600 hover:underline"
            >
              Reenviar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
    