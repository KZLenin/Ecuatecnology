import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Headset, Bell, CreditCard, LogOut, MonitorSpeaker, UserPlus, List,Info, Check, AlertCircle, ClipboardPlus } from "lucide-react";
import Logo from "../assets/logo.png";

const mainLinks = [
  { title: "Perfil", path: "/profile", icon: User },
  { title: "Notificationes", path: "/notifications", icon: Bell },
  { title: "Soporte", path: "/support", icon: Headset }
];

const adminLinks = [
  { title: "Dashboard", path: "/auth/sign-in", icon: LayoutDashboard },
  { title: "Usuarios", path: "/auth/sign-in", icon: UserPlus },
  { title: "Reportes", path: "/auth/sign-up", icon: Info },
  { title: "Alertas", path: "/auth/sign-up", icon: AlertCircle },
];

const receptionLinks = [
  { title: "Equipos", path: "/auth/sign-in", icon: MonitorSpeaker },
  { title: "Reportes", path: "/auth/sign-up", icon: Info },
];

const techLinks = [
  { title: "Equipos Asignados", path: "/auth/sign-up", icon: MonitorSpeaker },
  { title: "Ingresar Diagnostico", path: "/auth/sign-up", icon: ClipboardPlus },
];

const salesLinks = [
  { title: "Diagnostico", path: "/auth/sign-up", icon: ClipboardPlus },
  { title: "Proformas", path: "/auth/sign-up", icon: Info },
  { title: "Confirmaciones", path: "/auth/sign-up", icon: Check },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();

  return (
    <div className="md:flex md:min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-1/5 bg-gray-200 text-black px-5 py-6 flex flex-col">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Ecuatechnology Logo" className="w-28 h-auto" />
        </div>

        {/* Navegación principal */}
        <nav className="flex-1">
          {/* Sección Admin */}
          <hr className="my-4 border-gray-300" />
          <p className="text-xs text-gray-400 mb-2">Administrador</p>
          <ul>
            {adminLinks.map(({ title, path, icon: Icon }) => (
              <li key={path} className="mb-2">
                <NavLink
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                    ${pathname === path ? "bg-gray-900 text-black" : "hover:bg-yellow-300 text-black"}`}
                >
                  <Icon size={18} /> {title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Sección Recepcion */}
          <hr className="my-4 border-gray-300" />
          <p className="text-xs text-gray-400 mb-2">Recepción</p>
          <ul>
            {receptionLinks.map(({ title, path, icon: Icon }) => (
              <li key={path} className="mb-2">
                <NavLink
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                    ${pathname === path ? "bg-gray-900 text-black" : "hover:bg-yellow-300 text-black"}`}
                >
                  <Icon size={18} /> {title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Sección Tech */}
          <hr className="my-4 border-gray-300" />
          <p className="text-xs text-gray-400 mb-2">Técnico</p>
          <ul>
            {techLinks.map(({ title, path, icon: Icon }) => (
              <li key={path} className="mb-2">
                <NavLink
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                    ${pathname === path ? "bg-gray-900 text-black" : "hover:bg-yellow-300 text-black"}`}
                >
                  <Icon size={18} /> {title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Sección sales */}
          <hr className="my-4 border-gray-300" />
          <p className="text-xs text-gray-400 mb-2">Ventas</p>
          <ul>
            {salesLinks.map(({ title, path, icon: Icon }) => (
              <li key={path} className="mb-2">
                <NavLink
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                    ${pathname === path ? "bg-gray-900 text-black" : "hover:bg-yellow-300 text-black"}`}
                >
                  <Icon size={18} /> {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        

        {/* Link extra */}
        <div className="mt-auto pt-4 border-t border-gray-300">
            <ul>
            {mainLinks.map(({ title, path, icon: Icon }) => (
              <li key={path} className="mb-2">
                <NavLink
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                    ${pathname === path ? "bg-gray-900 text-black" : "hover:bg-yellow-300 text-black"}`}
                >
                  <Icon size={18} /> {title}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink
            to="/logout"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
              ${pathname === "/logout" ? "bg-gray-900 text-black" : "hover:bg-red-700 text-black"}`}
          >
            <LogOut size={18} /> Cerrar Sesion
          </NavLink>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
