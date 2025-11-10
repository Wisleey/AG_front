# Script de Setup do Frontend
# Execute: .\setup.ps1

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SETUP DO FRONTEND - NETWORKING" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Verificar se o arquivo .env.local existe
if (Test-Path ".env.local") {
    Write-Host "[OK] Arquivo .env.local ja existe" -ForegroundColor Green
} else {
    Write-Host "[INFO] Criando arquivo .env.local..." -ForegroundColor Yellow
    
    $envContent = @"
# API Backend URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Admin Key para requisicoes administrativas  
NEXT_PUBLIC_ADMIN_KEY=Admin@adminkey2025
"@
    
    Set-Content -Path ".env.local" -Value $envContent
    Write-Host "[OK] Arquivo .env.local criado com sucesso!" -ForegroundColor Green
}

Write-Host ""

# Verificar se node_modules existe
if (Test-Path "node_modules") {
    Write-Host "[OK] Dependencias ja instaladas" -ForegroundColor Green
} else {
    Write-Host "[INFO] Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Dependencias instaladas com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "[ERRO] Falha ao instalar dependencias" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] SETUP CONCLUIDO!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Proximo passo:" -ForegroundColor Yellow
Write-Host "   1. Certifique-se que o BACKEND esta rodando (porta 3001)" -ForegroundColor White
Write-Host "   2. Execute: npm run dev" -ForegroundColor White
Write-Host "   3. Acesse: http://localhost:3000`n" -ForegroundColor White

Write-Host "Paginas disponiveis:" -ForegroundColor Yellow
Write-Host "   - http://localhost:3000 (Home)" -ForegroundColor White
Write-Host "   - http://localhost:3000/intencao (Formulario)" -ForegroundColor White  
Write-Host "   - http://localhost:3000/admin/intencoes (Admin)" -ForegroundColor White
Write-Host "   - http://localhost:3000/dashboard (Dashboard)`n" -ForegroundColor White

