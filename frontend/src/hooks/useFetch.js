import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function useFetch() {
  const fetchDataBackend = async (
    url,
    data = null,
    method = "GET",
    headers = {}
  ) => {
    // 🔵 Mostrar modal de carga
    const loadingAlert = MySwal.fire({
      title: "Procesando solicitud...",
      text: "Por favor espera",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      const options = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        data,
      };

      const response = await axios(options);

      // ✅ Cerrar modal de carga antes de mostrar éxito
      MySwal.close();

      // ✅ Modal de éxito
      await MySwal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: response?.data?.msg || "Operación completada correctamente",
        confirmButtonText: "OK",
        backdrop: true,
      });

      return response?.data;
    } catch (error) {
      MySwal.close();

      // Extraer mensaje del backend o mensaje genérico
      const backendMsg =
        error.response?.data?.msg || "Ocurrió un error en el servidor";

      // ❌ Modal de error
      await MySwal.fire({
        icon: "error",
        title: "Error",
        text: backendMsg,
        confirmButtonText: "Entendido",
        backdrop: true,
      });

      // Opcional: relanzar error si quieres manejarlo afuera
      throw error;
    }
  };

  return fetchDataBackend;
}
