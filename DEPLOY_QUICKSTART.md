# 🚀 Deploy Rápido na Vercel

## ⚡ 3 Passos para Hospedar

### 1️⃣ Verificar Projeto
```bash
# Windows
.\verify-deploy.ps1

# Linux/Mac
./verify-deploy.sh
```

### 2️⃣ Commit e Push
```bash
git add .
git commit -m "Preparar para deploy Vercel"
git push origin main
```

### 3️⃣ Deploy na Vercel

**Opção A: Dashboard (Mais fácil)**
1. Acesse: https://vercel.com/new
2. Importe o repositório
3. Configurações:
   - **Root Directory**: `frontend`
   - **Framework**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Clique "Deploy"

**Opção B: CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## ✅ Arquivos Configurados

- ✅ `vercel.json` - Configuração de rotas e build
- ✅ `.vercelignore` - Ignora backend e arquivos pesados
- ✅ `frontend/package.json` - Script vercel-build adicionado
- ✅ `.env.example` - Modelo de variáveis de ambiente

---

## 🔗 Após Deploy

Sua aplicação estará em:
```
https://seu-projeto.vercel.app
```

---

## 📚 Guia Completo

Ver: `VERCEL_DEPLOY_GUIDE.md` para troubleshooting e configurações avançadas.

---

## 🆘 Problemas Comuns

### Build falha
```bash
cd frontend
npm install
npm run build
```

### Rotas não funcionam
✅ Já configurado no `vercel.json`

### API não conecta
Configure variável de ambiente no dashboard:
```
REACT_APP_API_URL=https://sua-api.com
```

---

**Status**: ✅ Pronto para deploy!
