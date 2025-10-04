/**
 * Dashboard de Alertas com Análise de Impactos Cruzados
 */
import React, { useState, useEffect } from 'react';
import { anomaliasAPI } from '../../services/api';
import { Alerta, AlertasResponse, CategoriasResponse } from '../../types/alertas';
import AlertaCard from '../../components/common/AlertaCard';

const DashboardAlertas: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [filtroSeveridade, setFiltroSeveridade] = useState<string>('');
  const [categorias, setCategorias] = useState<CategoriasResponse | null>(null);
  const [resumo, setResumo] = useState<AlertasResponse['resumo'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar categorias disponíveis
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await anomaliasAPI.getCategorias();
        setCategorias(response.data);
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
      }
    };

    fetchCategorias();
  }, []);

  // Carregar alertas
  useEffect(() => {
    const fetchAlertas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await anomaliasAPI.getAlertasComImpactos(
          filtroCategoria || undefined,
          filtroSeveridade || undefined
        );
        const data: AlertasResponse = response.data;
        setAlertas(data.alertas);
        setResumo(data.resumo);
      } catch (err) {
        console.error('Erro ao carregar alertas:', err);
        setError('Erro ao carregar alertas. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlertas();
  }, [filtroCategoria, filtroSeveridade]);

  // Limpar filtros
  const limparFiltros = () => {
    setFiltroCategoria('');
    setFiltroSeveridade('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Alertas com Análise de Impactos
          </h1>
          <p className="text-gray-600">
            Anomalias detectadas nos dados municipais com validação cruzada de impactos em outras métricas
          </p>
        </div>

        {/* Resumo */}
        {resumo && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-red-100 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-sm text-gray-600 font-semibold">Críticos</p>
              <p className="text-3xl font-bold text-red-900">{resumo.criticos}</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 border-l-4 border-yellow-600">
              <p className="text-sm text-gray-600 font-semibold">Atenção</p>
              <p className="text-3xl font-bold text-yellow-900">{resumo.atencao}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-sm text-gray-600 font-semibold">Informativos</p>
              <p className="text-3xl font-bold text-blue-900">{resumo.informativos}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-sm text-gray-600 font-semibold">Positivas</p>
              <p className="text-3xl font-bold text-green-900">{resumo.anomalias_positivas}</p>
            </div>
            <div className="bg-orange-100 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-sm text-gray-600 font-semibold">Negativas</p>
              <p className="text-3xl font-bold text-orange-900">{resumo.anomalias_negativas}</p>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            <button
              onClick={limparFiltros}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Limpar Filtros
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filtro Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                {categorias?.categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Severidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severidade
              </label>
              <select
                value={filtroSeveridade}
                onChange={(e) => setFiltroSeveridade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas as severidades</option>
                {categorias?.severidades.map((sev) => (
                  <option key={sev.id} value={sev.id}>
                    {sev.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Lista de Alertas */}
        {!loading && !error && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {alertas.length} {alertas.length === 1 ? 'Alerta' : 'Alertas'} encontrado{alertas.length === 1 ? '' : 's'}
              </h2>
            </div>

            {alertas.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">
                  Nenhum alerta encontrado com os filtros selecionados.
                </p>
              </div>
            ) : (
              <div>
                {alertas.map((alerta) => (
                  <AlertaCard key={alerta.id} alerta={alerta} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAlertas;

