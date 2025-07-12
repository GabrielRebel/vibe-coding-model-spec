# VCMS Project Creator
# Usage: .\create-project.ps1 "project-name"

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectName
)

# Validate project name (lowercase, hyphens only)
if ($ProjectName -notmatch '^[a-z0-9-]+$') {
    Write-Error "Project name must be lowercase with only letters, numbers, and hyphens"
    exit 1
}

# Check if project already exists
$ProjectPath = ".\$ProjectName"
if (Test-Path $ProjectPath) {
    Write-Error "Project '$ProjectName' already exists!"
    exit 1
}

Write-Host "Creating new VCMS project: $ProjectName" -ForegroundColor Green

# Copy template
Copy-Item -Path ".\project-template" -Destination $ProjectPath -Recurse

# Update files with project name
$ReadmePath = "$ProjectPath\README.md"
$SpecPath = "$ProjectPath\spec.md"

# Update README
(Get-Content $ReadmePath) | ForEach-Object {
    $_ -replace '\[Project Name\]', $ProjectName
} | Set-Content $ReadmePath

# Update spec
$CurrentDate = Get-Date -Format "yyyy-MM-dd"
(Get-Content $SpecPath) | ForEach-Object {
    $_ -replace '\[Project Name\]', $ProjectName `
       -replace '\[Date\]', $CurrentDate
} | Set-Content $SpecPath

Write-Host "Project created successfully!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. cd $ProjectName" -ForegroundColor White
Write-Host "2. Edit spec.md with your project details" -ForegroundColor White
Write-Host "3. Start building!" -ForegroundColor White 