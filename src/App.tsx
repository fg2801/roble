import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppSidebar from "@/components/AppSidebar";
import Dashboard from "@/pages/Dashboard";
import Wallet from "@/pages/Wallet";
import TradingAcciones from "@/pages/TradingAcciones";
import ResumenSemanal from "@/pages/ResumenSemanal";
import Reportes from "@/pages/Reportes";
import PortafoliosModelo from "@/pages/PortafoliosModelo";
import MisFavoritos from "@/pages/MisFavoritos";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

function Protected({ children }: { children: React.ReactNode }) {
  // Comentado temporalmente para testing
  // const { user, loading } = useAuth();
  // if (loading) return null;
  // if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Protected><Shell><Dashboard /></Shell></Protected>} />
        <Route path="/wallet" element={<Protected><Shell><Wallet /></Shell></Protected>} />
        <Route path="/trading" element={<Protected><Shell><TradingAcciones /></Shell></Protected>} />
        <Route path="/reportes" element={<Protected><Shell><Reportes /></Shell></Protected>} />
        <Route path="/resumen" element={<Protected><Shell><ResumenSemanal /></Shell></Protected>} />
        <Route path="/portafolios-modelo" element={<Protected><Shell><PortafoliosModelo /></Shell></Protected>} />
        <Route path="/favoritos" element={<Protected><Shell><MisFavoritos /></Shell></Protected>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}