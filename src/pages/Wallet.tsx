import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Eye, EyeOff, Plus, Filter, Search, Download } from 'lucide-react';

interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  type: 'stock' | 'bond' | 'etf' | 'crypto';
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketValue: number;
  allocation: number;
  sector: string;
}

const samplePortfolio: PortfolioItem[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    type: 'stock',
    quantity: 150,
    avgPrice: 175.50,
    currentPrice: 182.30,
    change: 6.80,
    changePercent: 3.88,
    marketValue: 27345,
    allocation: 18.5,
    sector: 'Tecnología'
  },
  {
    id: '2',
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    type: 'stock',
    quantity: 100,
    avgPrice: 320.00,
    currentPrice: 335.45,
    change: 15.45,
    changePercent: 4.83,
    marketValue: 33545,
    allocation: 22.7,
    sector: 'Tecnología'
  },
  {
    id: '3',
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    type: 'stock',
    quantity: 200,
    avgPrice: 240.00,
    currentPrice: 225.80,
    change: -14.20,
    changePercent: -5.92,
    marketValue: 45160,
    allocation: 30.5,
    sector: 'Automotriz'
  },
  {
    id: '4',
    name: 'SPDR S&P 500 ETF',
    symbol: 'SPY',
    type: 'etf',
    quantity: 50,
    avgPrice: 420.00,
    currentPrice: 435.20,
    change: 15.20,
    changePercent: 3.62,
    marketValue: 21760,
    allocation: 14.7,
    sector: 'ETF'
  },
  {
    id: '5',
    name: 'US Treasury Bond',
    symbol: 'T-BOND',
    type: 'bond',
    quantity: 1000,
    avgPrice: 100.00,
    currentPrice: 98.50,
    change: -1.50,
    changePercent: -1.50,
    marketValue: 9850,
    allocation: 6.7,
    sector: 'Bonos'
  }
];

export default function Wallet() {
  const [showValues, setShowValues] = useState(true);
  const [filterType, setFilterType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPortfolio = samplePortfolio
    .filter(item => !filterType || item.type === filterType)
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalValue = filteredPortfolio.reduce((sum, item) => sum + item.marketValue, 0);
  const totalGain = filteredPortfolio.reduce((sum, item) => sum + (item.currentPrice - item.avgPrice) * item.quantity, 0);
  const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100;

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'stock':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'bond':
        return <BarChart3 className="w-4 h-4 text-green-600" />;
      case 'etf':
        return <PieChart className="w-4 h-4 text-purple-600" />;
      case 'crypto':
        return <DollarSign className="w-4 h-4 text-orange-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stock': return 'bg-blue-100 text-blue-800';
      case 'bond': return 'bg-green-100 text-green-800';
      case 'etf': return 'bg-purple-100 text-purple-800';
      case 'crypto': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portafolios</h1>
          <p className="text-gray-600">Gestión de inversiones y activos</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Agregar Activo
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Resumen del portafolio */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">
                ${showValues ? totalValue.toLocaleString() : '***'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ganancia Total</p>
              <p className="text-2xl font-bold text-gray-900">
                ${showValues ? totalGain.toLocaleString() : '***'}
              </p>
              <p className={`text-sm ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {showValues ? `${totalGainPercent >= 0 ? '+' : ''}${totalGainPercent.toFixed(2)}%` : '***'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-gray-900">{filteredPortfolio.length}</p>
              <p className="text-sm text-gray-600">En portafolio</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Diversificación</p>
              <p className="text-2xl font-bold text-gray-900">Alta</p>
              <p className="text-sm text-gray-600">5 sectores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowValues(!showValues)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showValues ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showValues ? 'Ocultar Valores' : 'Mostrar Valores'}
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar activos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Filtro por tipo */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="stock">Acciones</option>
              <option value="bond">Bonos</option>
              <option value="etf">ETFs</option>
              <option value="crypto">Criptomonedas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla del portafolio */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Activo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Precio Promedio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Precio Actual
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Cambio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Valor de Mercado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Asignación
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPortfolio.map((item, index) => (
                <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  {/* Activo */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        {renderTypeIcon(item.type)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.symbol}</div>
                      </div>
                    </div>
                  </td>

                  {/* Tipo */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type.toUpperCase()}
                    </span>
                  </td>

                  {/* Cantidad */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.quantity.toLocaleString()}
                  </td>

                  {/* Precio Promedio */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${showValues ? item.avgPrice.toFixed(2) : '***'}
                  </td>

                  {/* Precio Actual */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${showValues ? item.currentPrice.toFixed(2) : '***'}
                  </td>

                  {/* Cambio */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change >= 0 ? '+' : ''}${showValues ? item.change.toFixed(2) : '***'}
                    </div>
                    <div className={`text-xs ${item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.changePercent >= 0 ? '+' : ''}{showValues ? item.changePercent.toFixed(2) : '***'}%
                    </div>
                  </td>

                  {/* Valor de Mercado */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${showValues ? item.marketValue.toLocaleString() : '***'}
                  </td>

                  {/* Asignación */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" 
                          style={{width: `${item.allocation}%`}}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-700">{item.allocation}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico de asignación por sector */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Asignación por Sector</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Tecnología', 'Automotriz', 'ETF', 'Bonos'].map((sector) => {
            const sectorItems = filteredPortfolio.filter(item => item.sector === sector);
            const sectorValue = sectorItems.reduce((sum, item) => sum + item.marketValue, 0);
            const sectorAllocation = (sectorValue / totalValue) * 100;
            
            return (
              <div key={sector} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{sector}</span>
                  <span className="text-sm text-gray-500">{sectorAllocation.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500" 
                    style={{width: `${sectorAllocation}%`}}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  ${sectorValue.toLocaleString()} • {sectorItems.length} activos
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
