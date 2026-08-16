$ErrorActionPreference = "Stop"
Set-Location "$PSScriptRoot\..\..\e2e"

if (-not (Test-Path "node_modules")) {
    npm install
}

npx playwright install chromium
npm test
