$ErrorActionPreference = "Stop"
Set-Location "$PSScriptRoot\..\..\backend"

if (Test-Path ".\mvnw.cmd") {
    .\mvnw.cmd spring-boot:run
} else {
    Write-Host "Maven Wrapper not generated yet; using installed Maven." -ForegroundColor Yellow
    mvn spring-boot:run
}
