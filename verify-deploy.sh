#!/bin/bash

# Script de verificação pré-deploy
# Execute antes de fazer deploy para garantir que tudo está OK

echo "🔍 Verificando projeto para deploy na Vercel..."
echo ""

# Verificar se está na pasta correta
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto!"
    exit 1
fi

echo "✅ Estrutura de pastas OK"

# Verificar arquivos de configuração
files=("vercel.json" ".vercelignore" "frontend/package.json" "frontend/public/index.html")
all_exist=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file existe"
    else
        echo "❌ $file não encontrado!"
        all_exist=false
    fi
done

if [ "$all_exist" = false ]; then
    echo ""
    echo "❌ Arquivos faltando! Corrija antes do deploy."
    exit 1
fi

echo ""
echo "🔨 Testando build local..."

# Navegar para frontend
cd frontend || exit

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Fazer build
echo "🏗️  Executando build..."
if npm run build; then
    echo "✅ Build concluído com sucesso!"
else
    echo "❌ Build falhou!"
    cd ..
    exit 1
fi

# Verificar tamanho do build
build_size=$(du -sm build | cut -f1)
echo "📊 Tamanho do build: ${build_size} MB"

if [ "$build_size" -gt 50 ]; then
    echo "⚠️  Aviso: Build grande (>50MB). Considere otimizar."
else
    echo "✅ Tamanho do build adequado"
fi

# Voltar para raiz
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Projeto pronto para deploy!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Commit suas mudanças: git add . && git commit -m 'Preparar deploy'"
echo "   2. Push para o repositório: git push origin main"
echo "   3. Acesse vercel.com e importe o repositório"
echo "   4. Ou use CLI: vercel --prod"
echo ""
echo "📚 Ver guia completo: VERCEL_DEPLOY_GUIDE.md"
echo ""
