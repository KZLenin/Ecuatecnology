import { BrowserRouter, Route, Routes } from "react-router";

//Paginas
import LoginPage from "./pages/LoginPage";
import OtpPage from './pages/OtpPage';
import ForgotPassw from './pages/ForgotPage'
import ChangePassw from './pages/ChangePassword'
import Dashboard from './layouts/dashboard'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path="otp" element={<OtpPage/>}/>
        <Route path="forgot-password" element={<ForgotPassw/>}/>
        <Route path="change-password" element={<ChangePassw/>}/>

        <Route path='/dashboard' element={<Dashboard/>}>

        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
