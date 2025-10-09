# 🚀 PASSO A PASSO: Deploy Correto no Vercel

## 🎯 PROBLEMA IDENTIFICADO

O Vercel está tentando clonar o repositório **ERRADO**:

```diff
- ❌ github.com/Rykum/mvp-tracegov (ERRADO)
+ ✅ github.com/pdrpinto/hackathon-hacknhub (CORRETO)
```

---

## 📋 SOLUÇÃO: 3 Passos Simples

### ✅ PASSO 1: Desconectar Projeto Antigo

1. Acesse: **https://vercel.com/dashboard**
2. Clique no projeto atual (que está dando erro)
3. Vá em **Settings** (engrenagem no topo)
4. Role até **"Danger Zone"**
5. Clique em **"Delete Project"**
6. Confirme digitando o nome do projeto

---

### ✅ PASSO 2: Criar Novo Projeto

1. No dashboard, clique em **"New Project"** (botão azul)

2. **Importar do GitHub**:
   - Se não aparecer `pdrpinto/hackathon-hacknhub`:
     - Clique em **"Adjust GitHub App Permissions"**
     - Dê acesso ao repositório correto
   - Selecione: `pdrpinto/hackathon-hacknhub`

3. **Configurar Deploy**:

```
┌─────────────────────────────────────────────┐
│ Configure Project                            │
├─────────────────────────────────────────────┤
│                                              │
│ Project Name:                                │
│ └─ tracegov-foz-iguacu                      │
│                                              │
│ Framework Preset:                            │
│ └─ Create React App          [dropdown ▼]   │
│                                              │
│ Root Directory:                              │
│ └─ frontend                  [Edit Button]  │
│    ⚠️ IMPORTANTE: Clicar em Edit e digitar  │
│       "frontend" (sem aspas)                │
│                                              │
│ Build and Output Settings:                  │
│ ├─ Build Command:     npm run build         │
│ ├─ Output Directory:  build                 │
│ └─ Install Command:   npm install           │
│                                              │
└─────────────────────────────────────────────┘
```

4. **NÃO adicione variáveis de ambiente ainda** (só quando tiver backend)

5. Clique em **"Deploy"** (botão azul grande)

---

### ✅ PASSO 3: Aguardar Deploy

O Vercel vai:
1. ✅ Clonar `github.com/pdrpinto/hackathon-hacknhub`
2. ✅ Entrar na pasta `frontend/`
3. ✅ Rodar `npm install`
4. ✅ Rodar `npm run build`
5. ✅ Publicar o site

**Tempo estimado:** 2-3 minutos

---

## 🎉 RESULTADO ESPERADO

### ✅ Build Logs Corretos:

```bash
22:XX:XX.XXX Cloning github.com/pdrpinto/hackathon-hacknhub (Branch: main, Commit: ac31f29)
22:XX:XX.XXX Cloning completed: XXX.XXXms
22:XX:XX.XXX Analyzing source code...
22:XX:XX.XXX Installing dependencies...
22:XX:XX.XXX Building...
22:XX:XX.XXX Build Completed in /vercel/output [XX.XXs]
22:XX:XX.XXX Deploying...
22:XX:XX.XXX ✅ Deployment completed
```

### 🌐 URL do Site:

```
https://hackathon-hacknhub-<random-hash>.vercel.app
```

ou

```
https://tracegov-foz-iguacu.vercel.app
```

---

## ⚙️ CONFIGURAÇÕES APLICADAS

### 📄 `/vercel.json` (Raiz)
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

### 📄 `/frontend/vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Função:** Garante que rotas do React Router funcionem (SPA routing)

---

## 🐛 TROUBLESHOOTING

### ❌ Erro: "Build Command failed"

**Causa:** Dependências faltando ou erro no código

**Solução:**
```bash
cd C:\Users\Ppica\clone-gits\Clone-gits\hackathon-hacknhub\frontend
npm install
npm run build
```

Se funcionar localmente, deve funcionar no Vercel.

---

### ❌ Erro: "Root Directory not found"

**Causa:** Esqueceu de configurar "Root Directory: frontend"

**Solução:**
1. Settings → General
2. Root Directory → Edit → `frontend`
3. Save
4. Redeploy

---

### ❌ Erro: "404 Not Found" ao navegar

**Causa:** Falta configuração de rewrites para SPA

**Solução:** Já está configurado no `vercel.json` ✅

---

### ❌ Erro: Ainda clonando repositório errado

**Causa:** Projeto antigo não foi deletado

**Solução:**
1. Delete o projeto completamente
2. Aguarde 5 minutos
3. Crie novo projeto do zero

---

## 🎯 CHECKLIST FINAL

Antes de fazer deploy, confirme:

- [x] Commit feito e pushed para `main`
- [x] `vercel.json` configurado na raiz
- [x] `frontend/vercel.json` configurado
- [ ] Projeto antigo deletado no Vercel
- [ ] Novo projeto criado com repositório correto
- [ ] Root Directory configurado como `frontend`
- [ ] Framework Preset: Create React App
- [ ] Deploy iniciado

---

## 🔗 LINKS ÚTEIS

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentação Vercel + React**: https://vercel.com/guides/deploying-react-with-vercel
- **Seu Repositório**: https://github.com/pdrpinto/hackathon-hacknhub

---

## 💬 SUPORTE

Se o deploy continuar falhando:

1. **Copie os logs completos** do Vercel
2. **Verifique se o build funciona localmente**:
   ```bash
   cd frontend
   npm run build
   ```
3. **Verifique se não há erros no console**

---

## ✅ PRÓXIMOS PASSOS (Após Deploy Bem-Sucedido)

1. **Testar o site online**
2. **Configurar domínio customizado** (opcional):
   - Settings → Domains
   - Add Domain: `tracegov.seunome.com`
3. **Configurar ambiente de preview** (opcional):
   - Cada PR gera preview automático
4. **Adicionar Analytics** (opcional):
   - Settings → Analytics → Enable

---

**Status**: ✅ Configurações commitadas  
**Branch**: `main`  
**Commit**: `ac31f29`  
**Próximo passo**: Criar novo projeto no Vercel
