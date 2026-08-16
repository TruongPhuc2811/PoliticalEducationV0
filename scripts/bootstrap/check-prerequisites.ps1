$ErrorActionPreference = "Continue"

function Check-Command($name, $versionArgs) {
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if (-not $cmd) {
        Write-Host "[MISSING] $name" -ForegroundColor Red
        return
    }

    Write-Host "[OK] $name -> $($cmd.Source)" -ForegroundColor Green
    try {
        & $name $versionArgs
    } catch {
        Write-Host "  Could not read version: $($_.Exception.Message)" -ForegroundColor Yellow
    }
    Write-Host ""
}

Write-Host "Political Education System - prerequisite check" -ForegroundColor Cyan
Write-Host ""

Check-Command "git" "--version"
Check-Command "java" "--version"
Check-Command "mvn" "--version"
Check-Command "node" "--version"
Check-Command "npm" "--version"
Check-Command "mysql" "--version"

Write-Host "Expected baseline:" -ForegroundColor Cyan
Write-Host "- Java 21"
Write-Host "- MySQL 8.4"
Write-Host "- Node.js 22+"
Write-Host "- Maven (then generate Maven Wrapper)"
Write-Host "- No Docker required"
