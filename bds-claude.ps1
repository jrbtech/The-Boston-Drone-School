# Boston Drone School Claude CLI Helper
# This script provides easy access to the Claude AI assistant

param(
    [Parameter(Position=0)]
    [string]$Command,
    
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

# Set the project root directory
$ProjectRoot = "C:\Users\megan\Downloads\The-Boston-Drone-School"

# Change to project directory
Push-Location $ProjectRoot

# Check if ANTHROPIC_API_KEY is set
if (-not $env:ANTHROPIC_API_KEY) {
    Write-Host "❌ Error: ANTHROPIC_API_KEY environment variable not set" -ForegroundColor Red
    Write-Host "Please set your API key first:" -ForegroundColor Yellow
    Write-Host "  `$env:ANTHROPIC_API_KEY = 'your_api_key_here'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or add it to your PowerShell profile for permanent use:" -ForegroundColor Yellow
    Write-Host "  Add-Content `$PROFILE '`$env:ANTHROPIC_API_KEY = \"your_api_key_here\"'" -ForegroundColor Cyan
    Pop-Location
    exit 1
}

# Show help if no command provided
if (-not $Command) {
    Write-Host "🤖 Boston Drone School Claude AI Assistant" -ForegroundColor Green
    Write-Host ""
    Write-Host "Available commands:" -ForegroundColor Yellow
    Write-Host "  chat                    - Start interactive chat"
    Write-Host "  analyze <file>          - Analyze code file"
    Write-Host "  generate-course         - Generate course content"
    Write-Host "  safety-check <content>  - Check safety compliance"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\bds-claude.ps1 chat"
    Write-Host "  .\bds-claude.ps1 analyze src/main.rs"
    Write-Host "  .\bds-claude.ps1 generate-course -t 'Drone Photography' -l beginner"
    Write-Host "  .\bds-claude.ps1 safety-check 'Flying drone in residential area'"
    Pop-Location
    exit 0
}

# Execute the Node.js CLI with the provided arguments
try {
    $AllArgs = @($Command) + $Args
    & node "bds-claude-cli.js" @AllArgs
} catch {
    Write-Host "❌ Error executing command: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    Pop-Location
}