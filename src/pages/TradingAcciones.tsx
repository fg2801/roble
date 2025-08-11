import { useState } from 'react';
import { TrendingUp, BarChart3, Search, Eye, Plus, ArrowUpRight, Activity, Target } from 'lucide-react';

interface StockItem {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  sector: string;
  recommendation: 'buy' | 'hold' | 'sell';
  watchlist: boolean;
}

const sampleStocks: StockItem[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 182.30,
    change: 6.80,
    changePercent: 3.88,
    volume: 45678900,
    marketCap: 2850000000000,
    pe: 28.5,
    sector: 'Tecnología',
    recommendation: 'buy',
    watchlist: true
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 335.45,
    change: 15.45,
    changePercent: 4.83,
    volume: 23456700,
    marketCap: 2500000000000,
    pe: 32.1,
    sector: 'Tecnología',
    recommendation: 'buy',
    watchlist: true
  },
  {
    id: '3',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    currentPrice: 225.80,
    change: -14.20,
    changePercent: -5.92,
    volume: 67890100,
    marketCap: 720000000000,
    pe: 45.2,
    sector: 'Automotriz',
    recommendation: 'hold',
    watchlist: false
  },
  {
    id: '4',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    currentPrice: 142.50,
    change: 3.20,
    changePercent: 2.30,
    volume: 34567800,
    marketCap: 1800000000000,
    pe: 25.8,
    sector: 'Tecnología',
    recommendation: 'buy',
    watchlist: false
  },
  {
    id: '5',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    currentPrice: 145.80,
    change: -2.10,
    changePercent: -1.42,
    volume: 56789000,
    marketCap: 1500000000000,
    pe: 35.6,
    sector: 'Comercio',
    recommendation: 'hold',
    watchlist: true
  }
];

export default function TradingAcciones() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [filterRecommendation, setFilterRecommendation] = useState('');
  const [showWatchlist, setShowWatchlist] = useState(false);

  const filteredStocks = sampleStocks
    .filter(stock => !filterSector || stock.sector === filterSector)
    .filter(stock => !filterRecommendation || stock.recommendation === filterRecommendation)
    .filter(stock => !showWatchlist || stock.watchlist)
    .filter(stock => 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'buy': return 'bg-green-100 text-green-800';
      case 'hold': return 'bg-yellow-100 text-yellow-800';
      case 'sell': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case 'buy': return 'COMPRAR';
      case 'hold': return 'MANTENER';
      case 'sell': return 'VENDER';
      default: return 'N/A';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trading & Acciones</h1>
          <p className="text-gray-600">Análisis de mercado y oportunidades de inversión</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Nueva Orden
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-4 h-4" />
            Análisis
          </button>
        </div>
      </div>

      {/* Métricas del mercado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">S&P 500</p>
              <p className="text-2xl font-bold text-gray-900">4,352.20</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+0.85%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">NASDAQ</p>
              <p className="text-2xl font-bold text-gray-900">13,678.45</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+1.23%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Volatilidad</p>
              <p className="text-2xl font-bold text-gray-900">18.5%</p>
              <p className="text-sm text-gray-600">VIX: 22.3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Oportunidades</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-green-600">+3 hoy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles y filtros */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowWatchlist(!showWatchlist)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showWatchlist 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Eye className="w-4 h-4" />
              Watchlist
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar acciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Filtro por sector */}
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los sectores</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Automotriz">Automotriz</option>
              <option value="Comercio">Comercio</option>
              <option value="Finanzas">Finanzas</option>
            </select>

            {/* Filtro por recomendación */}
            <select
              value={filterRecommendation}
              onChange={(e) => setFilterRecommendation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las recomendaciones</option>
              <option value="buy">Comprar</option>
              <option value="hold">Mantener</option>
              <option value="sell">Vender</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de acciones */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Acción
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Cambio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Volumen
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  P/E
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Recomendación
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredStocks.map((stock, index) => (
                <tr key={stock.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  {/* Acción */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{stock.symbol}</div>
                        <div className="text-xs text-gray-500">{stock.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Precio */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${stock.currentPrice.toFixed(2)}
                  </td>

                  {/* Cambio */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
                    </div>
                    <div className={`text-xs ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </td>

                  {/* Volumen */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(stock.volume / 1000000).toFixed(1)}M
                  </td>

                  {/* P/E */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.pe.toFixed(1)}
                  </td>

                  {/* Sector */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {stock.sector}
                    </span>
                  </td>

                  {/* Recomendación */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRecommendationColor(stock.recommendation)}`}>
                      {getRecommendationText(stock.recommendation)}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico de rendimiento por sector */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Rendimiento por Sector</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Tecnología', 'Automotriz', 'Comercio', 'Finanzas'].map((sector) => {
            const sectorStocks = filteredStocks.filter(stock => stock.sector === sector);
            const avgChange = sectorStocks.length > 0 
              ? sectorStocks.reduce((sum, stock) => sum + stock.changePercent, 0) / sectorStocks.length 
              : 0;
            
            return (
              <div key={sector} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{sector}</span>
                  <span className={`text-sm font-medium ${avgChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      avgChange >= 0 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-red-500 to-pink-500'
                    }`}
                    style={{width: `${Math.abs(avgChange) * 2}%`}}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {sectorStocks.length} acciones
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
