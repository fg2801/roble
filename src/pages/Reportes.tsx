import { useState, useEffect } from 'react';
import { FileText, Download, Eye, Calendar, User, TrendingUp, Search, BookOpen, Upload, Trash2 } from 'lucide-react';
import { uploadFile, listFiles, getPublicUrl, deleteFile } from '@/integrations/supabase/storage';

interface Report {
  id: string;
  title: string;
  author: string;
  date: string;
  category: 'market' | 'company' | 'sector' | 'economic' | 'technical';
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  pages: number;
  rating: number;
  downloads: number;
  summary: string;
  tags: string[];
}

const sampleReports: Report[] = [
  {
    id: '1',
    title: 'Análisis de Mercado Semanal - Tecnología',
    author: 'Dr. Carlos Mendoza',
    date: '2025-01-15',
    category: 'sector',
    type: 'weekly',
    pages: 24,
    rating: 4.8,
    downloads: 156,
    summary: 'Análisis profundo del sector tecnológico, incluyendo tendencias emergentes, valoraciones y recomendaciones de inversión para el próximo trimestre.',
    tags: ['Tecnología', 'Análisis', 'Tendencias', 'Inversión']
  },
  {
    id: '2',
    title: 'Reporte Económico Mensual - Enero 2025',
    author: 'Ana García',
    date: '2025-01-10',
    category: 'economic',
    type: 'monthly',
    pages: 18,
    rating: 4.6,
    downloads: 89,
    summary: 'Resumen de indicadores económicos clave, análisis de políticas monetarias y proyecciones para los mercados financieros.',
    tags: ['Economía', 'Política Monetaria', 'Indicadores', 'Proyecciones']
  },
  {
    id: '3',
    title: 'Análisis Fundamental: Apple Inc.',
    author: 'Roberto Silva',
    date: '2025-01-08',
    category: 'company',
    type: 'monthly',
    pages: 32,
    rating: 4.9,
    downloads: 203,
    summary: 'Análisis completo de la empresa Apple, incluyendo finanzas, estrategia de negocio, competencia y valoración intrínseca.',
    tags: ['Apple', 'Análisis Fundamental', 'Valoración', 'Tecnología']
  },
  {
    id: '4',
    title: 'Perspectivas del Mercado Inmobiliario',
    author: 'María López',
    date: '2025-01-05',
    category: 'sector',
    type: 'quarterly',
    pages: 28,
    rating: 4.4,
    downloads: 67,
    summary: 'Análisis del sector inmobiliario, tendencias de precios, factores de demanda y oportunidades de inversión.',
    tags: ['Inmobiliario', 'Tendencias', 'Precios', 'Inversión']
  },
  {
    id: '5',
    title: 'Reporte Técnico Diario - 15 Enero',
    author: 'Luis Torres',
    date: '2025-01-15',
    category: 'technical',
    type: 'daily',
    pages: 8,
    rating: 4.2,
    downloads: 45,
    summary: 'Análisis técnico del mercado, niveles de soporte y resistencia, patrones de velas y señales de trading.',
    tags: ['Análisis Técnico', 'Trading', 'Patrones', 'Señales']
  }
];

export default function Reportes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Estado para archivos
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshFiles, setRefreshFiles] = useState(0);

  // Listar archivos al cargar
  useEffect(() => {
    async function fetchFiles() {
      try {
        const data = await listFiles();
        setFiles(data || []);
      } catch (err) {
        setError('Error al listar archivos');
      }
    }
    fetchFiles();
  }, [refreshFiles]);

  // Subir archivo
  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    setError(null);
    try {
      await uploadFile(selectedFile);
      setSelectedFile(null);
      setRefreshFiles(r => r + 1);
    } catch (err) {
      setError('Error al subir archivo');
    } finally {
      setUploading(false);
    }
  }

  // Eliminar archivo
  async function handleDelete(path: string) {
    if (!window.confirm('¿Eliminar este archivo?')) return;
    try {
      await deleteFile(path);
      setRefreshFiles(r => r + 1);
    } catch (err) {
      setError('Error al eliminar archivo');
    }
  }

  const filteredReports = sampleReports
    .filter(report => !filterCategory || report.category === filterCategory)
    .filter(report => !filterType || report.type === filterType)
    .filter(report => 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market': return 'bg-blue-100 text-blue-800';
      case 'company': return 'bg-green-100 text-green-800';
      case 'sector': return 'bg-purple-100 text-purple-800';
      case 'economic': return 'bg-yellow-100 text-yellow-800';
      case 'technical': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'market': return 'Mercado';
      case 'company': return 'Empresa';
      case 'sector': return 'Sector';
      case 'economic': return 'Económico';
      case 'technical': return 'Técnico';
      default: return 'N/A';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'daily': return 'Diario';
      case 'weekly': return 'Semanal';
      case 'monthly': return 'Mensual';
      case 'quarterly': return 'Trimestral';
      case 'annual': return 'Anual';
      default: return 'N/A';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i < Math.floor(rating) ? 'bg-yellow-400' : 'bg-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Subida y listado de archivos */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          Documentos y Reportes Subidos
        </h2>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg,.ppt,.pptx,.txt,.zip,.rar,.mp4,.mp3"
            onChange={e => setSelectedFile(e.target.files?.[0] || null)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Subiendo...' : 'Subir Archivo'}
          </button>
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </form>
        {/* Lista de archivos subidos */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Archivo</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {files.length === 0 && (
                <tr><td colSpan={2} className="px-4 py-2 text-gray-500">No hay archivos subidos.</td></tr>
              )}
              {files.map(file => (
                <tr key={file.name} className="border-b">
                  <td className="px-4 py-2">{file.name}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <a
                      href={getPublicUrl(file.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      <Eye className="w-4 h-4" /> Ver
                    </a>
                    <a
                      href={getPublicUrl(file.name)}
                      download
                      className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    >
                      <Download className="w-4 h-4" /> Descargar
                    </a>
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Reportes</h1>
          <p className="text-gray-600">Análisis financieros y reportes de mercado</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <BookOpen className="w-4 h-4" />
            Nuevo Reporte
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Descargar Todo
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reportes</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReports.length}</p>
              <p className="text-sm text-gray-600">Disponibles</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Descargas</p>
              <p className="text-2xl font-bold text-gray-900">
                {sampleReports.reduce((sum, report) => sum + report.downloads, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Este mes</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rating Promedio</p>
              <p className="text-2xl font-bold text-gray-900">
                {(sampleReports.reduce((sum, report) => sum + report.rating, 0) / sampleReports.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">De 5 estrellas</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Autores</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(sampleReports.map(report => report.author)).size}
              </p>
              <p className="text-sm text-gray-600">Expertos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles y filtros */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredReports.length} reportes encontrados
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar reportes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Filtro por categoría */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las categorías</option>
              <option value="market">Mercado</option>
              <option value="company">Empresa</option>
              <option value="sector">Sector</option>
              <option value="economic">Económico</option>
              <option value="technical">Técnico</option>
            </select>

            {/* Filtro por tipo */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="daily">Diario</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
              <option value="annual">Anual</option>
            </select>

            {/* Ordenar por */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Más recientes</option>
              <option value="rating">Mejor rating</option>
              <option value="downloads">Más descargados</option>
              <option value="title">Alfabético</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de reportes */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Información principal */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">{report.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {report.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(report.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                      {getCategoryText(report.category)}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {getTypeText(report.type)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{report.summary}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {report.pages} páginas
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    {report.downloads} descargas
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {renderStars(report.rating)}
                    </div>
                    <span>{report.rating}/5</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {report.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Descargar
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                  Vista Previa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de categorías */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribución por Categoría</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {['market', 'company', 'sector', 'economic', 'technical'].map((category) => {
            const categoryReports = filteredReports.filter(report => report.category === category);
            const percentage = (categoryReports.length / filteredReports.length) * 100;
            
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{getCategoryText(category)}</span>
                  <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500" 
                    style={{width: `${percentage}%`}}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {categoryReports.length} reportes
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
