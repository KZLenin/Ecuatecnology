import { BrowserRouter, Route, Routes } from "react-router";

//Paginas
import LoginPage from "./pages/LoginPage";
import OtpPage from './pages/OtpPage';
import ForgotPassw from './pages/ForgotPage'
import ChangePassw from './pages/ChangePassword'
import DashboardGerencia from './pages/DashboardGerencia'
import DashboardRecepcion from './pages/DashboardRecepcion'
import DashboardTecnico from './pages/DashboardTecnico'
import DashboardVentas from './pages/DashboardVentas'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path="otp" element={<OtpPage/>}/>
        <Route path="forgot-password" element={<ForgotPassw/>}/>
        <Route path="change-password" element={<ChangePassw/>}/>

        <Route path="dashboard-gerencia" element={<DashboardGerencia/>}/>
        <Route path="dashboard-recepcion" element={<DashboardRecepcion/>}/>
        <Route path="dashboard-tecnico" element={<DashboardTecnico/>}/>
        <Route path="dashboard-ventas" element={<DashboardVentas/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
