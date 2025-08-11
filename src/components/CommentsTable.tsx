import { useState } from 'react';
import { useExpandableComments } from '@/hooks/useExpandableComments';
import { sampleComments } from '@/data/commentsData';
import { Star, ChevronDown, ChevronUp, MessageSquare, Calendar, User, Eye, EyeOff } from 'lucide-react';

export default function CommentsTable() {
  const { expanded, toggleRow, expandAll, collapseAll } = useExpandableComments();
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComments = sampleComments
    .filter(c => !filterRating || c.rating === filterRating)
    .filter(c => 
      c.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header con controles mejorados */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Comentarios y Análisis</h2>
              <p className="text-gray-600">Feedback de expertos y análisis del mercado</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar comentarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <MessageSquare className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Filtro por rating */}
            <select
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los ratings</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>
          </div>
        </div>

        {/* Controles de expansión */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredComments.length} comentarios encontrados
            </span>
            {filterRating && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Filtrado por {filterRating} estrellas
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              Expandir todo
            </button>
            <button
              onClick={collapseAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              <EyeOff className="w-4 h-4" />
              Contraer todo
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de comentarios mejorada */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Comentario
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredComments.map((comment, index) => (
                <tr key={comment.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  {/* Autor */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{comment.author}</div>
                        <div className="text-xs text-gray-500">Experto financiero</div>
                      </div>
                    </div>
                  </td>

                  {/* Fecha */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(comment.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(comment.rating || 0)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">({comment.rating}/5)</span>
                    </div>
                  </td>

                  {/* Comentario */}
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <div className={`transition-all duration-300 ${
                        !expanded[comment.id] 
                          ? "max-h-16 overflow-hidden text-ellipsis" 
                          : ""
                      }`}>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {comment.comment}
                        </p>
                      </div>
                      <button
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-2 flex items-center gap-1 transition-colors"
                        onClick={() => toggleRow(comment.id)}
                      >
                        {expanded[comment.id] ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Ocultar
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            Ver completo
                          </>
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleRow(comment.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                      title={expanded[comment.id] ? "Contraer" : "Expandir"}
                    >
                      {expanded[comment.id] ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estadísticas mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">{filteredComments.length}</div>
              <div className="text-sm text-blue-600">Total comentarios</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">
                {filteredComments.filter(c => c.rating === 5).length}
              </div>
              <div className="text-sm text-green-600">5 estrellas</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-700">
                {filteredComments.filter(c => c.rating === 4).length}
              </div>
              <div className="text-sm text-yellow-600">4 estrellas</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-700">
                {(filteredComments.reduce((acc, c) => acc + (c.rating || 0), 0) / filteredComments.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Rating promedio</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
