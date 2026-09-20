Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   SAARTHI PROTOTYPE END-TO-END VERIFICATION  " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Test Backend Health
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get -TimeoutSec 5
    Write-Host "[1/6] Backend Health Check: PASSED" -ForegroundColor Green
    Write-Host "      Project: $($health.project)"
    Write-Host "      Status:  $($health.status)"
} catch {
    Write-Host "[1/6] Backend Health Check: FAILED ($($_.Exception.Message))" -ForegroundColor Red
}

# 2. Test Schemes Endpoint
try {
    $schemesRes = Invoke-RestMethod -Uri "http://localhost:5000/api/schemes" -Method Get -TimeoutSec 5
    Write-Host "[2/6] Schemes Catalog API: PASSED ($($schemesRes.total) schemes loaded)" -ForegroundColor Green
} catch {
    Write-Host "[2/6] Schemes Catalog API: FAILED" -ForegroundColor Red
}

# 3. Test Scheme Matching Engine Endpoint
try {
    $profile = @{
        category = "Women"
        gender = "Female"
        businessType = "Street Vendor"
        loanAmount = 50000
        area = "Urban"
    } | ConvertTo-Json

    $matchRes = Invoke-RestMethod -Uri "http://localhost:5000/api/schemes/match" -Method Post -Body $profile -ContentType "application/json" -TimeoutSec 5
    Write-Host "[3/6] Matching Engine API: PASSED" -ForegroundColor Green
    Write-Host "      Top Match: $($matchRes.topMatch.name) - $($matchRes.topMatch.matchScore)% ($($matchRes.topMatch.status))"
} catch {
    Write-Host "[3/6] Matching Engine API: FAILED ($($_.Exception.Message))" -ForegroundColor Red
}

# 4. Test Channel Partners Endpoint
try {
    $partnersRes = Invoke-RestMethod -Uri "http://localhost:5000/api/partners" -Method Get -TimeoutSec 5
    Write-Host "[4/6] Channel Partners API: PASSED ($($partnersRes.total) verified centers)" -ForegroundColor Green
    Write-Host "      Sample Center: $($partnersRes.partners[0].name) ($($partnersRes.partners[0].district))"
} catch {
    Write-Host "[4/6] Channel Partners API: FAILED" -ForegroundColor Red
}

# 5. Test Saarthi Mitra Chatbot Endpoint
try {
    $chatBody = @{ message = "What documents are needed for street vendors?" } | ConvertTo-Json
    $chatRes = Invoke-RestMethod -Uri "http://localhost:5000/api/chat/message" -Method Post -Body $chatBody -ContentType "application/json" -TimeoutSec 5
    Write-Host "[5/6] Saarthi Mitra Chatbot API: PASSED" -ForegroundColor Green
    Write-Host "      Bot Response: $($chatRes.reply.Substring(0, [Math]::Min(110, $chatRes.reply.Length)))..."
} catch {
    Write-Host "[5/6] Saarthi Mitra Chatbot API: FAILED" -ForegroundColor Red
}

# 6. Test Frontend Vite Server & Open Browser
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3000" -Method Get -TimeoutSec 5
    Write-Host "[6/6] Frontend Vite Dev Server: PASSED (HTTP $($frontend.StatusCode))" -ForegroundColor Green
    
    # Launch default browser
    Start-Process "http://localhost:3000"
    Write-Host "`n>>> Successfully launched http://localhost:3000 in your browser! <<<" -ForegroundColor Yellow
} catch {
    Write-Host "[6/6] Frontend Vite Dev Server: FAILED ($($_.Exception.Message))" -ForegroundColor Red
}

Write-Host "=============================================" -ForegroundColor Cyan
