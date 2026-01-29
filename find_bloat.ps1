Write-Host "Hunting for large binary files (> 500KB)..." -ForegroundColor Cyan

# Threshold in Bytes (500KB)
$THRESHOLD = 500 * 1024

$files = Get-ChildItem -Recurse -File | 
    Where-Object { 
        $_.Length -gt $THRESHOLD -and 
        $_.FullName -notmatch "node_modules" -and 
        $_.FullName -notmatch "\.git\\" 
    } | 
    Select-Object Name, @{Name="Size(MB)";Expression={"{0:N2}" -f ($_.Length / 1MB)}}, Directory | 
    Sort-Object Length -Descending

if ($files.Count -eq 0) {
    Write-Host "✅ No large binary files found!" -ForegroundColor Green
} else {
    $files | Format-Table -AutoSize
    Write-Host "`n⚠️  Found $($files.Count) large files that might be bloating your repo." -ForegroundColor Yellow
}
