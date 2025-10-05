# Script de verificacao pre-deploy
# Execute antes de fazer deploy para garantir que tudo esta OK

Write-Host "Verificando projeto para deploy na Vercel..." -ForegroundColor Cyan
Write-Host ""

# Verificar se esta na pasta correta
if (-not (Test-Path "frontend/package.json")) {
    Write-Host "ERRO: Execute este script na raiz do projeto!" -ForegroundColor Red
    exit 1
}

Write-Host "OK: Estrutura de pastas OK" -ForegroundColor Green

# Verificar arquivos de configuracao
$requiredFiles = @(
    "vercel.json",
    ".vercelignore",
    "frontend/package.json",
    "frontend/public/index.html"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "OK: $file existe" -ForegroundColor Green
    } else {
        Write-Host "ERRO: $file nao encontrado!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "ERRO: Arquivos faltando! Corrija antes do deploy." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Testando build local..." -ForegroundColor Cyan

# Navegar para frontend
Set-Location frontend

# Instalar dependencias se necessario
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

# Fazer build
Write-Host "Executando build..." -ForegroundColor Yellow
npm run build | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "OK: Build concluido com sucesso!" -ForegroundColor Green
} else {
    Write-Host "ERRO: Build falhou!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Verificar tamanho do build
if (Test-Path "build") {
    $buildSize = (Get-ChildItem -Path "build" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "Tamanho do build: $([math]::Round($buildSize, 2)) MB" -ForegroundColor Cyan

    if ($buildSize -gt 50) {
        Write-Host "AVISO: Build grande (>50MB). Considere otimizar." -ForegroundColor Yellow
    } else {
        Write-Host "OK: Tamanho do build adequado" -ForegroundColor Green
    }
}

# Voltar para raiz
Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Projeto pronto para deploy!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Cyan
Write-Host "   1. Commit: git add . && git commit -m 'Preparar deploy'" -ForegroundColor White
Write-Host "   2. Push: git push origin main" -ForegroundColor White
Write-Host "   3. Acesse vercel.com e importe o repositorio" -ForegroundColor White
Write-Host "   4. Ou use CLI: vercel --prod" -ForegroundColor White
Write-Host ""
Write-Host "Ver guia completo: VERCEL_DEPLOY_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
