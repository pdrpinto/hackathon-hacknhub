import { create } from 'zustand';

export type Regiao = 'Norte' | 'Sul' | 'Leste' | 'Oeste' | 'Centro' | '';

interface FiltersState {
  // Período
  ano?: number;
  ano_inicio?: number;
  ano_fim?: number;

  // Localização
  regiao: Regiao;
  bairro_id?: number;

  // API params helpers
  setAno: (ano?: number) => void;
  setPeriodo: (inicio?: number, fim?: number) => void;
  setRegiao: (regiao: Regiao) => void;
  setBairroId: (id?: number) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  ano: 2023,
  ano_inicio: 2020,
  ano_fim: 2023,
  regiao: '',
  bairro_id: undefined,

  setAno: (ano) => set({ ano }),
  setPeriodo: (ano_inicio, ano_fim) => set({ ano_inicio, ano_fim }),
  setRegiao: (regiao) => set({ regiao }),
  setBairroId: (bairro_id) => set({ bairro_id }),
  reset: () => set({ ano: 2023, ano_inicio: 2020, ano_fim: 2023, regiao: '', bairro_id: undefined }),
}));
