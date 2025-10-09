# 🚨 FIX: Deploy Vercel - Repositório Errado

## ❌ Problema Identificado

O Vercel está clonando o repositório **ERRADO**:

```
❌ Clonando: github.com/Rykum/mvp-tracegov
✅ Deveria clonar: github.com/pdrpinto/hackathon-hacknhub
```

---

## 🔧 SOLUÇÃO RÁPIDA

### Passo 1: Desconectar Projeto Atual

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto que está dando erro
3. **Settings** → **Git** → **Disconnect**

### Passo 2: Criar Novo Projeto

1. Clique em **"New Project"**
2. **Import Git Repository** → Selecione `pdrpinto/hackathon-hacknhub`
3. Configure:

```
📁 Root Directory: frontend
🌿 Branch: main
⚙️ Framework Preset: Create React App
🔨 Build Command: npm run build
📦 Output Directory: build
📥 Install Command: npm install
```

### Passo 3: Variáveis de Ambiente (se necessário)

No futuro, quando tiver backend:
```env
REACT_APP_API_URL=https://sua-api.vercel.app
```

---

## 📋 Configurações do vercel.json

### ✅ Já Configurado

Ambos os arquivos foram atualizados:

#### `/vercel.json` (Raiz)
```json
{
  "version": 2,
  "name": "tracegov-foz-iguacu",
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

#### `/frontend/vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "installCommand": "npm install",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🚀 Deploy Correto

### Opção 1: Via Vercel Dashboard (Recomendado)

1. **Dashboard** → **New Project**
2. **Import** `pdrpinto/hackathon-hacknhub`
3. **Root Directory**: `frontend`
4. **Deploy**

### Opção 2: Via Vercel CLI

```bash
cd C:\Users\Ppica\clone-gits\Clone-gits\hackathon-hacknhub\frontend
npm install -g vercel
vercel login
vercel --prod
```

---

## ✅ Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] **Repositório correto**: `pdrpinto/hackathon-hacknhub`
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `frontend`
- [ ] **Build funciona localmente**: `npm run build`
- [ ] **Sem erros de compilação**: `npm start`
- [ ] **vercel.json configurado**
- [ ] **package.json com scripts corretos**

---

## 🐛 Troubleshooting

### Erro: "Build failed"

```bash
# Teste local primeiro
cd frontend
npm install
npm run build
```

Se falhar localmente, corrija antes de tentar deploy.

### Erro: "Command not found: react-scripts"

```bash
cd frontend
npm install react-scripts --save
```

### Erro: "Module not found"

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Routes não funcionam (404)"

Certifique-se que `vercel.json` tem:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

---

## 📊 Estrutura do Projeto

```
hackathon-hacknhub/              ← Raiz do repositório
├── vercel.json                  ← Config para apontar /frontend
├── README.md
├── backend/                     ← Não será deployado agora
└── frontend/                    ← ROOT DIRECTORY no Vercel
    ├── vercel.json              ← Config específica do frontend
    ├── package.json
    ├── public/
    ├── src/
    └── build/                   ← Gerado no deploy
```

---

## 🎯 URL Final

Após deploy bem-sucedido:
```
https://hackathon-hacknhub-<hash>.vercel.app
```

Você pode configurar um domínio customizado depois:
```
https://tracegov-foz.vercel.app
```

---

## 💡 Próximos Passos

1. **Fazer commit dos vercel.json**:
```bash
git add vercel.json frontend/vercel.json
git commit -m "fix: Configurar Vercel para deploy correto do frontend"
git push origin main
```

2. **Criar novo projeto no Vercel** com repositório correto

3. **Testar deploy**

4. **Configurar domínio customizado** (opcional)

---

## 📚 Documentação

- **Vercel + Create React App**: https://vercel.com/guides/deploying-react-with-vercel
- **Vercel CLI**: https://vercel.com/docs/cli
- **Configuração vercel.json**: https://vercel.com/docs/project-configuration

---

**Status**: ✅ Configurações atualizadas  
**Próximo passo**: Reconectar projeto no Vercel com repositório correto  
**Tempo estimado**: 5 minutos
