# Boston Drone School E-Learning Platform - Deployment Script
# Run this script to deploy the complete platform

Write-Host "🚀 Boston Drone School E-Learning Platform Deployment" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Check prerequisites
function Test-Prerequisites {
    Write-Host "`n📋 Checking prerequisites..." -ForegroundColor Yellow
    
    # Check Node.js
    try {
        $nodeVersion = node --version
        Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ Node.js not found. Install from https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
    
    # Check npm
    try {
        $npmVersion = npm --version
        Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ npm not found" -ForegroundColor Red
        exit 1
    }
    
    # Check Docker (optional)
    try {
        $dockerVersion = docker --version
        Write-Host "✅ Docker: $dockerVersion" -ForegroundColor Green
        $global:DockerAvailable = $true
    } catch {
        Write-Host "⚠️ Docker not available (optional)" -ForegroundColor Yellow
        $global:DockerAvailable = $false
    }
}

# Environment setup
function Set-Environment {
    Write-Host "`n🔧 Setting up environment..." -ForegroundColor Yellow
    
    # Check for environment files
    if (-not (Test-Path "bds-api-node\.env")) {
        Write-Host "📝 Creating API environment file..." -ForegroundColor Cyan
        Copy-Item "bds-api-node\.env.example" "bds-api-node\.env"
        Write-Host "⚠️ Please edit bds-api-node\.env with your actual values" -ForegroundColor Yellow
    }
    
    if (-not (Test-Path "bds-frontend\.env.local")) {
        Write-Host "📝 Creating frontend environment file..." -ForegroundColor Cyan
        Copy-Item "bds-frontend\.env.example" "bds-frontend\.env.local"
        Write-Host "⚠️ Please edit bds-frontend\.env.local with your actual values" -ForegroundColor Yellow
    }
    
    # Check for API key
    $env:ANTHROPIC_API_KEY = Get-Content "bds-api-node\.env" | Where-Object { $_ -match "ANTHROPIC_API_KEY=" } | ForEach-Object { $_.Split("=")[1] }
    if (-not $env:ANTHROPIC_API_KEY -or $env:ANTHROPIC_API_KEY -eq "your_anthropic_api_key_here") {
        Write-Host "❌ ANTHROPIC_API_KEY not configured" -ForegroundColor Red
        Write-Host "Get your API key from: https://console.anthropic.com/" -ForegroundColor Yellow
        Read-Host "Press Enter after setting up your API key in bds-api-node\.env"
    } else {
        Write-Host "✅ Anthropic API key configured" -ForegroundColor Green
    }
}

# Install dependencies
function Install-Dependencies {
    Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
    
    # Root dependencies (CLI)
    Write-Host "Installing CLI dependencies..." -ForegroundColor Cyan
    npm install
    
    # Backend dependencies
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    Set-Location "bds-api-node"
    npm install
    Set-Location ".."
    
    # Frontend dependencies
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    Set-Location "bds-frontend"
    npm install
    Set-Location ".."
    
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
}

# Build applications
function Build-Applications {
    Write-Host "`n🔨 Building applications..." -ForegroundColor Yellow
    
    # Build backend
    Write-Host "Building backend API..." -ForegroundColor Cyan
    Set-Location "bds-api-node"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Backend build failed" -ForegroundColor Red
        exit 1
    }
    Set-Location ".."
    
    # Build frontend
    Write-Host "Building frontend..." -ForegroundColor Cyan
    Set-Location "bds-frontend"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Frontend build failed" -ForegroundColor Red
        exit 1
    }
    Set-Location ".."
    
    Write-Host "✅ Applications built successfully" -ForegroundColor Green
}

# Test deployment
function Test-Deployment {
    Write-Host "`n🧪 Testing deployment..." -ForegroundColor Yellow
    
    # Start backend in background
    Write-Host "Starting backend API..." -ForegroundColor Cyan
    Set-Location "bds-api-node"
    $backendProcess = Start-Process "npm" -ArgumentList "start" -PassThru -NoNewWindow
    Set-Location ".."
    
    Start-Sleep 5
    
    # Test API health
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3001/api/health" -Method GET
        Write-Host "✅ Backend API responding: $($response.status)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Backend API not responding" -ForegroundColor Red
        $backendProcess.Kill()
        exit 1
    }
    
    # Test Claude integration
    try {
        Write-Host "Testing Claude CLI integration..." -ForegroundColor Cyan
        $env:ANTHROPIC_API_KEY = Get-Content "bds-api-node\.env" | Where-Object { $_ -match "ANTHROPIC_API_KEY=" } | ForEach-Object { $_.Split("=")[1] }
        node bds-claude-cli.js --help | Out-Null
        Write-Host "✅ Claude CLI working" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Claude CLI needs API key configuration" -ForegroundColor Yellow
    }
    
    # Clean up
    $backendProcess.Kill()
}

# Deployment options
function Show-DeploymentOptions {
    Write-Host "`n🚀 Deployment Options:" -ForegroundColor Green
    Write-Host "1. Local Development - Run both frontend and backend locally"
    Write-Host "2. Docker Compose - Full containerized deployment"
    Write-Host "3. Render.com - Cloud deployment (recommended)"
    Write-Host "4. Manual Production - Custom server deployment"
    
    $choice = Read-Host "`nSelect deployment option (1-4)"
    
    switch ($choice) {
        "1" { Start-LocalDevelopment }
        "2" { Start-DockerDeployment }
        "3" { Show-RenderDeployment }
        "4" { Show-ManualDeployment }
        default { Write-Host "Invalid option" -ForegroundColor Red }
    }
}

function Start-LocalDevelopment {
    Write-Host "`n🖥️ Starting local development..." -ForegroundColor Green
    Write-Host "Backend will run on: http://localhost:3001" -ForegroundColor Cyan
    Write-Host "Frontend will run on: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "`nPress Ctrl+C to stop both services" -ForegroundColor Yellow
    
    # Start both services
    Start-Process "cmd" -ArgumentList "/c", "cd bds-api-node && npm run dev"
    Start-Sleep 2
    Start-Process "cmd" -ArgumentList "/c", "cd bds-frontend && npm run dev"
}

function Start-DockerDeployment {
    if (-not $global:DockerAvailable) {
        Write-Host "❌ Docker not available. Install Docker Desktop." -ForegroundColor Red
        return
    }
    
    Write-Host "`n🐳 Starting Docker deployment..." -ForegroundColor Green
    docker-compose up -d
    Write-Host "✅ Containers started. Access at http://localhost" -ForegroundColor Green
}

function Show-RenderDeployment {
    Write-Host "`n☁️ Render.com Deployment Instructions:" -ForegroundColor Green
    Write-Host "1. Push code to GitHub repository"
    Write-Host "2. Connect repository to Render.com"
    Write-Host "3. Render will use the render.yaml configuration"
    Write-Host "4. Set environment variables in Render dashboard"
    Write-Host "5. Deploy automatically on git push"
    Write-Host "`n📝 render.yaml is already configured for you!"
}

function Show-ManualDeployment {
    Write-Host "`n⚙️ Manual Production Deployment:" -ForegroundColor Green
    Write-Host "1. Copy built files to production server"
    Write-Host "2. Set up reverse proxy (nginx configuration provided)"
    Write-Host "3. Configure SSL certificates"
    Write-Host "4. Set up process manager (PM2 recommended)"
    Write-Host "5. Configure database backups"
}

# Main execution
try {
    Test-Prerequisites
    Set-Environment
    Install-Dependencies
    Build-Applications
    Test-Deployment
    
    Write-Host "`n🎉 Deployment preparation complete!" -ForegroundColor Green
    Write-Host "Your Boston Drone School e-learning platform is ready!" -ForegroundColor Green
    
    Show-DeploymentOptions
    
} catch {
    Write-Host "`n❌ Deployment failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}