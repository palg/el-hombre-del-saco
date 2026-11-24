@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command "$jsonFiles = Get-ChildItem -Path '%~dp0data\*.json'; foreach ($f in $jsonFiles) { $varName = 'DATA_' + $f.BaseName.ToUpper(); $content = Get-Content -Raw -Path $f.FullName -Encoding UTF8; $jsPath = '%~dp0data\' + $f.BaseName + '.js'; [System.IO.File]::WriteAllText($jsPath, 'window.' + $varName + ' = ' + $content + ';', [System.Text.Encoding]::UTF8); Write-Host 'Sincronizado: ' $f.BaseName '.js' }"
echo.
echo Datos sincronizados correctamente.
pause
