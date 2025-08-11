import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Wallet, 
  TrendingUp, 
  Heart, 
  PieChart, 
  FileText, 
  BarChart3,
  Building2
} from "lucide-react";

const Item = ({ to, active, children, icon: Icon }: { 
  to: string; 
  active: boolean; 
  children: React.ReactNode;
  icon: any;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      active 
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg" 
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} />
    {children}
  </Link>
);

export default function AppSidebar() {
  const { pathname } = useLocation();
  const is = (p: string) => pathname === p;
  
  return (
    <aside className="w-64 border-r border-gray-200 p-6 space-y-2 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Roble Capital</h1>
            <p className="text-xs text-gray-500">Wealth Management</p>
          </div>
        </div>
      </div>

      {/* Separador visual */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>

      {/* Navegación */}
      <nav className="space-y-2">
        <Item to="/" active={is("/")} icon={Home}>Inicio</Item>
        <Item to="/wallet" active={is("/wallet")} icon={Wallet}>Portafolios</Item>
        <Item to="/trading" active={is("/trading")} icon={TrendingUp}>Acciones & Trading</Item>
        <Item to="/favoritos" active={is("/favoritos")} icon={Heart}>Mis Favoritos</Item>
        <Item to="/portafolios-modelo" active={is("/portafolios-modelo")} icon={PieChart}>Portafolio Modelo</Item>
        <Item to="/reportes" active={is("/reportes")} icon={FileText}>Biblioteca de Reportes</Item>
        <Item to="/resumen" active={is("/resumen")} icon={BarChart3}>Resumen Semanal</Item>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 text-center">
            Plataforma privada de gestión de inversiones
          </p>
        </div>
      </div>
    </aside>
  );
}
