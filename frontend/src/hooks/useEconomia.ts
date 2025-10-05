import { useEffect, useMemo, useRef, useState } from 'react';
import { economiaAPI } from '../services/api';
import type { EconomiaKpis, TopCnaeItem, EconomiaSerieItem } from '../types/economia';

export function useKpisEconomia(params: { ano?: number; bairro_id?: number; regiao?: string }) {
  const [data, setData] = useState<EconomiaKpis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    economiaAPI
      .getKPIs(params)
      .then((res) => {
        const payload = res.data?.dados ?? res.data; // compatibilidade
        if (payload?.sucesso === false) throw new Error(payload?.erro || 'Erro na API');
        setData(payload?.dados ? payload.dados : payload);
      })
      .catch((e) => {
        if (controller.signal.aborted) return;
        setError(e?.message || 'Erro ao carregar KPIs');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [params.ano, params.bairro_id, params.regiao]);

  return { data, loading, error };
}

export function useSerieEconomia(params: { indicador: string; ano_inicio?: number; ano_fim?: number; bairro_id?: number; regiao?: string }) {
  const [data, setData] = useState<EconomiaSerieItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!params.indicador) return;
    setLoading(true);
    setError(null);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    economiaAPI
      .getSerie(params)
      .then((res) => {
        const payload = res.data?.dados ?? res.data?.dados?.dados ?? res.data; // fallback
        const list = Array.isArray(payload?.dados) ? payload.dados : payload;
        setData(list || []);
      })
      .catch((e) => {
        if (controller.signal.aborted) return;
        setError(e?.message || 'Erro ao carregar série');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [params.indicador, params.ano_inicio, params.ano_fim, params.bairro_id, params.regiao]);

  return { data, loading, error };
}

export function useTopCnaes(params: { ano?: number; metric?: string; limit?: number; bairro_id?: number; regiao?: string }) {
  const [data, setData] = useState<TopCnaeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    economiaAPI
      .getTopCNAE(params)
      .then((res) => {
        const payload = res.data?.dados ?? res.data;
        const list = Array.isArray(payload?.dados) ? payload.dados : payload;
        setData(list || []);
      })
      .catch((e) => {
        if (controller.signal.aborted) return;
        setError(e?.message || 'Erro ao carregar Top CNAEs');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [params.ano, params.metric, params.limit, params.bairro_id, params.regiao]);

  return { data, loading, error };
}
