# Comandos Prontos para Deploy

## 1. Fazer Commit das Configurações

```bash
git add .
git commit -m "Configurar deploy para Vercel - adicionar vercel.json, scripts e documentação"
git push origin main
```

## 2. Opção A: Deploy via Dashboard (Recomendado)

1. Acesse: https://vercel.com/new
2. Clique "Import Git Repository"
3. Selecione o repositório `hackathon-hacknhub`
4. Configure:
   - Root Directory: `frontend`
   - Framework Preset: `Create React App`
   - Build Command: `npm run build` (auto-detectado)
   - Output Directory: `build` (auto-detectado)
5. Clique "Deploy"

## 3. Opção B: Deploy via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy em produção
vercel --prod
```

Quando perguntado:
- Set up and deploy? `Y`
- Which scope? (selecione seu usuário)
- Link to existing project? `N`
- Project name? `hackathon-hacknhub` (ou outro nome)
- In which directory is your code? `frontend`
- Want to modify settings? `N`

## 4. Verificar Deploy

Após o deploy, você receberá uma URL:
```
✅ Production: https://seu-projeto.vercel.app
```

Teste as seguintes rotas:
- `/` - Landing page
- `/login` - Login com animações
- `/signup` - Cadastro
- `/dashboard` - Dashboard principal
- `/alertas` - Alertas com modal redesenhado
- `/economia` - Economia
- `/mapas` - Mapas interativos

## 5. Configurar Domínio Customizado (Opcional)

No dashboard Vercel:
1. Vá em Settings → Domains
2. Adicione seu domínio (ex: `cascavel.app.br`)
3. Configure DNS conforme instruções
4. Aguarde propagação (até 48h)

## 6. Configurar Variáveis de Ambiente (Opcional)

Se você tiver backend próprio:
1. Vá em Settings → Environment Variables
2. Adicione:
   ```
   Name: REACT_APP_API_URL
   Value: https://sua-api.com
   Scope: Production, Preview, Development
   ```
3. Redeploy o projeto

## 7. Monitorar Deploy

Dashboard Vercel mostra:
- Build logs
- Runtime logs
- Analytics
- Performance metrics
- Web Vitals

## 8. Deploy Automático

Após configurar:
- Todo `git push` para `main` → deploy de produção
- Todo `git push` para outras branches → deploy de preview

## Pronto! 🎉

Seu projeto estará online em alguns minutos!
