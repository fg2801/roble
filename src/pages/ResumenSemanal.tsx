import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Target,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

export default function ResumenSemanal() {
  const [selectedPeriod, setSelectedPeriod] = useState('semana');
  const [selectedMetric, setSelectedMetric] = useState('rendimiento');
  
  const periods = [
    { id: 'semana', label: 'Esta Semana', active: true },
    { id: 'mes', label: 'Este Mes', active: false },
    { id: 'trimestre', label: 'Este Trimestre', active: false },
    { id: 'año', label: 'Este Año', active: false }
  ];

  const metrics = [
    {
      id: 'rendimiento',
      title: "Rendimiento Total",
      value: "+12.45%",
      change: "+2.34%",
      trend: "up",
      icon: TrendingUp,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      id: 'volumen',
      title: "Volumen Operado",
      value: "$2.4M",
      change: "+18.2%",
      trend: "up",
      icon: BarChart3,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      id: 'operaciones',
      title: "Operaciones",
      value: "47",
      change: "-3",
      trend: "down",
      icon: DollarSign,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      id: 'dias',
      title: "Días Activos",
      value: "5/7",
      change: "+1",
      trend: "up",
      icon: Calendar,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  const weeklyData = [
    { day: 'Lun', value: 12.2, volume: 450, change: '+2.1%' },
    { day: 'Mar', value: 11.8, volume: 380, change: '-0.4%' },
    { day: 'Mié', value: 13.1, volume: 520, change: '+1.3%' },
    { day: 'Jue', value: 12.9, volume: 490, change: '-0.2%' },
    { day: 'Vie', value: 12.45, volume: 420, change: '-0.45%' }
  ];

  const topPerformers = [
    { 
      name: 'AAPL', 
      symbol: 'AAPL', 
      change: '+8.2%', 
      value: '$185.20', 
      volume: '2.1M',
      sector: 'Tecnología',
      trend: 'up'
    },
    { 
      name: 'Tesla Inc', 
      symbol: 'TSLA', 
      change: '+12.4%', 
      value: '$245.80', 
      volume: '1.8M',
      sector: 'Automotriz',
      trend: 'up'
    },
    { 
      name: 'Microsoft', 
      symbol: 'MSFT', 
      change: '+5.7%', 
      value: '$398.45', 
      volume: '1.5M',
      sector: 'Tecnología',
      trend: 'up'
    },
    { 
      name: 'Alphabet Inc', 
      symbol: 'GOOGL', 
      change: '+3.2%', 
      value: '$142.30', 
      volume: '1.2M',
      sector: 'Tecnología',
      trend: 'up'
    }
  ];

  const sectorPerformance = [
    { sector: 'Tecnología', performance: '+15.2%', weight: 45, color: 'bg-blue-500' },
    { sector: 'Energía', performance: '+8.7%', weight: 25, color: 'bg-green-500' },
    { sector: 'Financiero', performance: '+3.1%', weight: 20, color: 'bg-purple-500' },
    { sector: 'Consumo', performance: '-1.2%', weight: 10, color: 'bg-red-500' }
  ];

  const renderChart = () => {
    const maxValue = Math.max(...weeklyData.map(d => d.value));
    const minValue = Math.min(...weeklyData.map(d => d.value));
    
    return (
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={200 - (y * 2)}
              x2="400"
              y2={200 - (y * 2)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Area chart */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          <path
            d={`M 0 ${200 - (weeklyData[0].value / maxValue * 200)} ${weeklyData.map((d, i) => 
              `L ${(i + 1) * 80} ${200 - (d.value / maxValue * 200)}`
            ).join(' ')}`}
            fill="url(#areaGradient)"
            stroke="none"
          />
          
          {/* Line chart */}
          <path
            d={`M 0 ${200 - (weeklyData[0].value / maxValue * 200)} ${weeklyData.map((d, i) => 
              `L ${(i + 1) * 80} ${200 - (d.value / maxValue * 200)}`
            ).join(' ')}`}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {weeklyData.map((d, i) => (
            <circle
              key={i}
              cx={(i + 1) * 80}
              cy={200 - (d.value / maxValue * 200)}
              r="4"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2">
          {weeklyData.map((d, i) => (
            <span key={i} className="text-xs text-gray-500 font-medium">
              {d.day}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <LineChart className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Resumen Semanal</h1>
              </div>
              <p className="text-lg text-gray-600">Análisis del rendimiento de la semana del 5-11 de Enero, 2025</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                <Eye className="w-4 h-4" />
                Vista Previa
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl">
                <Download className="w-4 h-4" />
                Exportar PDF
              </button>
            </div>
          </div>
        </div>

        {/* Filtros de período */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Período de Análisis</h3>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Última actualización: hace 2 horas</span>
            </div>
          </div>
          
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              className={`bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer ${
                selectedMetric === metric.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.textColor}`} />
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {metric.trend === 'up' ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <ChevronUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{metric.change}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600">
                      <ChevronDown className="w-4 h-4" />
                      <span className="text-sm font-medium">{metric.change}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">vs anterior</span>
                </div>
                
                <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${metric.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Gráficos y análisis */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Gráfico principal */}
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Rendimiento Semanal</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Rendimiento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Mercado</span>
                </div>
              </div>
            </div>
            
            {renderChart()}
            
            <div className="grid grid-cols-5 gap-4 mt-6">
              {weeklyData.map((data, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{data.value}%</div>
                  <div className={`text-sm font-medium ${
                    data.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {data.change}
                  </div>
                  <div className="text-xs text-gray-500">Vol: ${data.volume}K</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top performers */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Top Performers</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver todos
              </button>
            </div>
            
            <div className="space-y-4">
              {topPerformers.map((stock, index) => (
                <div key={index} className="p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {stock.symbol.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{stock.name}</p>
                        <p className="text-sm text-gray-500">{stock.sector}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{stock.value}</p>
                      <p className={`text-sm font-medium ${
                        stock.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {stock.change}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Vol: {stock.volume}</span>
                    <div className="flex items-center gap-1">
                      {stock.trend === 'up' ? (
                        <ChevronUp className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-red-600" />
                      )}
                      <span className="text-gray-600">Tendencia</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Análisis por sector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Rendimiento por Sector</h3>
            <div className="space-y-4">
              {sectorPerformance.map((sector, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${sector.color}`}></div>
                    <span className="font-medium text-gray-900">{sector.sector}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-semibold ${
                      sector.performance.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {sector.performance}
                    </span>
                    <span className="text-sm text-gray-500 w-12 text-right">{sector.weight}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Resumen Ejecutivo</h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">🎯 Puntos Destacados</h4>
                <ul className="space-y-2 text-sm text-emerald-700">
                  <li>• Rendimiento superior al mercado (+12.45% vs +8.2%)</li>
                  <li>• Volumen operado aumentó 18.2% respecto a la semana anterior</li>
                  <li>• 5 de 7 días con operaciones rentables</li>
                  <li>• Mejor desempeño en tecnología y energía</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📈 Próximos Pasos</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Mantener exposición en sectores tecnológicos</li>
                  <li>• Considerar reducción en posiciones de consumo</li>
                  <li>• Evaluar nuevas oportunidades en energía renovable</li>
                  <li>• Revisar estrategia de cobertura para volatilidad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
