# 🚀 Guia de Deploy na Vercel

## 📋 Pré-requisitos

✅ Conta na [Vercel](https://vercel.com)
✅ Projeto com build funcionando localmente
✅ Repositório Git (GitHub, GitLab ou Bitbucket)

---

## 🎯 Método 1: Deploy via Dashboard (Recomendado)

### Passo 1: Importar Projeto
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Git Repository"**
3. Conecte sua conta GitHub/GitLab/Bitbucket
4. Selecione o repositório `hackathon-hacknhub`

### Passo 2: Configurar Build
Na tela de configuração, defina:

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### Passo 3: Variáveis de Ambiente (se necessário)
Adicione variáveis de ambiente na seção **Environment Variables**:

```
REACT_APP_API_URL=https://seu-backend.com/api
```

### Passo 4: Deploy
1. Clique em **"Deploy"**
2. Aguarde o build (2-5 minutos)
3. Acesse a URL gerada automaticamente

---

## 🖥️ Método 2: Deploy via CLI

### Instalação
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
# Na raiz do projeto
vercel

# Ou para produção
vercel --prod
```

---

## ⚙️ Configurações Aplicadas

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "framework": "create-react-app",
  "routes": [...],
  "rewrites": [...],
  "headers": [...]
}
```

### Principais Features
✅ **SPA Routing**: Todas as rotas redirecionam para `index.html`
✅ **Cache Otimizado**: Assets estáticos com cache de 1 ano
✅ **HTML Dinâmico**: `index.html` sem cache para updates rápidos
✅ **Framework Auto-detect**: Create React App reconhecido automaticamente

---

## 📁 Estrutura de Arquivos

```
hackathon-hacknhub/
├── frontend/               # Pasta do React
│   ├── public/
│   ├── src/
│   ├── build/             # Gerado após build
│   └── package.json
├── vercel.json            # Configuração da Vercel
├── .vercelignore          # Arquivos ignorados no deploy
└── README.md
```

---

## 🔧 Comandos de Build

### Build Local (teste antes do deploy)
```bash
cd frontend
npm run build
```

### Testar Build Localmente
```bash
# Instalar serve
npm install -g serve

# Servir build
serve -s build -p 3000
```

---

## 🌐 Domínio Customizado

### Adicionar Domínio Próprio
1. Acesse o projeto na Vercel
2. Vá em **Settings → Domains**
3. Adicione seu domínio (ex: `cascavel.com.br`)
4. Configure DNS conforme instruções

### Configuração DNS
```
Tipo: A ou CNAME
Nome: @ ou www
Valor: 76.76.21.21 (ou CNAME fornecido)
```

---

## 🔐 Variáveis de Ambiente

### No Dashboard
1. Vá em **Settings → Environment Variables**
2. Adicione variáveis:
   ```
   REACT_APP_API_URL=https://api.exemplo.com
   REACT_APP_GOOGLE_MAPS_KEY=sua-chave
   ```

### No Código
```typescript
const apiUrl = process.env.REACT_APP_API_URL;
```

**⚠️ Importante**: Prefixe variáveis públicas com `REACT_APP_`

---

## 🚨 Troubleshooting

### Erro: "DEPLOYMENT_BLOCKED"
**Causa**: Build excedeu limites de tempo/recursos
**Solução**: 
- Otimize dependências
- Remova arquivos pesados
- Use `.vercelignore`

### Erro: "FUNCTION_INVOCATION_TIMEOUT"
**Causa**: Função serverless demorou > 10s
**Solução**:
- Este projeto é SPA, não usa functions
- Verifique se não há APIs serverless acidentais

### Erro: "NOT_FOUND" após deploy
**Causa**: Rotas do React Router não funcionam
**Solução**: Verificar `vercel.json` tem rewrites configurados
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Erro de Build
**Causa**: Dependências faltando ou build falhou
**Solução**:
```bash
# Limpar cache e rebuildar localmente
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Assets não carregam
**Causa**: Paths incorretos
**Solução**: Use caminhos relativos ou `%PUBLIC_URL%`
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

---

## 📊 Otimizações Aplicadas

### 1. Cache Headers
```json
{
  "src": "/(.*\\.(js|css|json|ico|png|jpg|jpeg|svg|gif))",
  "headers": {
    "cache-control": "public, max-age=31536000, immutable"
  }
}
```

### 2. Compressão Automática
✅ Gzip/Brotli ativados automaticamente
✅ Assets otimizados no build

### 3. CDN Global
✅ Deploy em edge locations mundiais
✅ HTTPS automático
✅ HTTP/2 ativado

---

## 🔄 Deploy Automático

### Git Integration
Após configurar, todo `git push` dispara novo deploy:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

✅ **Main branch** → Deploy de produção
✅ **Outras branches** → Deploy de preview

---

## 📈 Monitoramento

### Analytics (disponível no dashboard)
- ✅ Pageviews
- ✅ Unique visitors
- ✅ Performance metrics
- ✅ Web Vitals (LCP, FID, CLS)

### Logs
Acesse logs de build e runtime em:
```
Dashboard → Deployments → [seu deploy] → Build Logs
```

---

## 💰 Limites do Plano Free

| Recurso | Limite |
|---------|--------|
| Bandwidth | 100 GB/mês |
| Builds | Ilimitados |
| Deployments | Ilimitados |
| Serverless Functions | 100 GB-Hrs |
| Build Duration | 45 minutos |

**✅ Este projeto está dentro dos limites**

---

## 🎯 Checklist Final

Antes do deploy:

- [ ] Build local funcionando (`npm run build`)
- [ ] Rotas testadas (Login, Dashboard, Alertas)
- [ ] Assets públicos em `frontend/public/`
- [ ] Variáveis de ambiente configuradas
- [ ] `.vercelignore` criado
- [ ] `vercel.json` configurado
- [ ] Git commit e push feitos

---

## 🚀 Deploy Rápido (TL;DR)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy (na raiz do projeto)
vercel --prod

# 4. Seguir prompts
# - Link to existing project? No
# - Project name? hackathon-hacknhub
# - Directory? frontend
# - Override settings? No
```

---

## 📝 URLs Importantes

- **Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Status**: [vercel-status.com](https://vercel-status.com)
- **Support**: [vercel.com/help](https://vercel.com/help)

---

## 🎉 Após o Deploy

Sua aplicação estará disponível em:
```
https://hackathon-hacknhub.vercel.app
```

Ou com domínio customizado:
```
https://seu-dominio.com.br
```

### Compartilhar Preview
Cada branch gera uma URL de preview:
```
https://hackathon-hacknhub-git-feature-branch.vercel.app
```

---

## 🔗 Integração com Backend

Se você tiver backend separado, configure CORS:

### Backend (Express exemplo)
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://hackathon-hacknhub.vercel.app',
    'https://seu-dominio.com.br'
  ]
}));
```

### Frontend
```typescript
// src/services/api.ts
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

axios.defaults.baseURL = API_URL;
```

---

## ✅ Status: Pronto para Deploy!

Todos os arquivos de configuração foram criados:
- ✅ `vercel.json` - Configuração principal
- ✅ `.vercelignore` - Arquivos ignorados
- ✅ `package.json` - Script `vercel-build` adicionado

**Pode fazer o deploy agora!** 🚀
