import CommentsTable from '@/components/CommentsTable';
import { TrendingUp, Users, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight, Target, Shield, Zap } from 'lucide-react';

export default function Dashboard() {
  const lastUpdate = "2025-01-15";

  return (
    <div className="space-y-8">
      {/* Header del Dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Principal</h1>
          <p className="text-gray-600">Resumen ejecutivo de Roble Capital</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Última actualización</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(lastUpdate).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Métricas principales - Primera fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rendimiento Total</p>
              <p className="text-2xl font-bold text-gray-900">+12.5%</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+2.3% vs mes anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valor del Portafolio</p>
              <p className="text-2xl font-bold text-gray-900">$2.4M</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+$180K este mes</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clientes Activos</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+12 este mes</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Operaciones Hoy</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">-5 vs ayer</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Meta Anual</p>
              <p className="text-xl font-bold text-gray-900">78%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Riesgo Promedio</p>
              <p className="text-xl font-bold text-gray-900">Bajo</p>
              <p className="text-xs text-emerald-600 mt-1">Portafolio conservador</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Volatilidad</p>
              <p className="text-xl font-bold text-gray-900">12.3%</p>
              <p className="text-xs text-amber-600 mt-1">Estable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de rendimiento */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Rendimiento del Portafolio</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Período:</span>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>1 Mes</option>
              <option>3 Meses</option>
              <option>6 Meses</option>
              <option>1 Año</option>
            </select>
          </div>
        </div>
        
        {/* Gráfico SVG simple */}
        <div className="h-64 flex items-end justify-center gap-2">
          {[65, 72, 68, 75, 82, 78, 85, 88, 92, 89, 94, 91].map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-400"
                style={{height: `${value * 0.5}px`}}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Evolución mensual del portafolio</p>
        </div>
      </div>

      {/* Tabla de comentarios */}
      <CommentsTable />
    </div>
  );
}
