# Frontend Build

Este diretório contém o frontend React que deve ser deployado.

## Configuração Vercel

Ao importar o projeto na Vercel, certifique-se de:

1. **Root Directory**: `frontend` (OBRIGATÓRIO)
2. **Framework Preset**: Create React App
3. **Build Command**: `npm run build` (auto)
4. **Output Directory**: `build` (auto)
5. **Install Command**: `npm install` (auto)

## Estrutura

```
frontend/
├── public/
├── src/
├── build/          (gerado após build)
└── package.json
```
