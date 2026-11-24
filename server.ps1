param([int]$Port = 8080)

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$baseDir = "e:\Games\puzzle-inci"
$savedDir = Join-Path $baseDir "saved-images"
if (-not (Test-Path $savedDir)) {
    New-Item -ItemType Directory -Path $savedDir -Force | Out-Null
}

$allowedExts = @(".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg")

function Send-Json($response, [int]$statusCode, [string]$jsonText) {
    $response.StatusCode = $statusCode
    $response.ContentType = "application/json; charset=utf-8"
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonText)
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
}

function Read-RequestBytes($request) {
    $ms = New-Object System.IO.MemoryStream
    $request.InputStream.CopyTo($ms)
    return $ms.ToArray()
}

function Get-ExtFromMeta([string]$contentType, [string]$nameOrUrl, [string]$defaultExt) {
    $ct = if ($contentType) { $contentType.ToLower().Split(';')[0].Trim() } else { "" }
    switch ($ct) {
        "image/png"     { return ".png" }
        "image/jpeg"    { return ".jpg" }
        "image/jpg"     { return ".jpg" }
        "image/webp"    { return ".webp" }
        "image/gif"     { return ".gif" }
        "image/svg+xml" { return ".svg" }
    }
    if ($nameOrUrl) {
        try {
            $clean = $nameOrUrl.Split('?')[0].Split('#')[0]
            $ext = [System.IO.Path]::GetExtension($clean).ToLower()
            if ($allowedExts -contains $ext) { return $ext }
        } catch {}
    }
    return $defaultExt
}

function Get-DisplayName([string]$filename) {
    if ($filename -match '^\d{8}_\d{6}_(.+)_[0-9a-f]{10}\.[^.]+$') {
        return $matches[1]
    }
    return [System.IO.Path]::GetFileNameWithoutExtension($filename)
}

function Save-ImageBytes([byte[]]$bytes, [string]$rawName, [string]$ext) {
    $sha = [System.Security.Cryptography.SHA256]::Create()
    $hashBytes = $sha.ComputeHash($bytes)
    $hashHex = ([System.BitConverter]::ToString($hashBytes) -replace '-', '').ToLower().Substring(0, 10)

    $existing = Get-ChildItem -Path $savedDir -File | Where-Object { $_.Name -match "_$hashHex\.[^.]+$" } | Select-Object -First 1
    if ($existing) {
        $existing.LastWriteTimeUtc = [DateTime]::UtcNow
        $fn = $existing.Name
        return @{
            ok = $true
            filename = $fn
            name = (Get-DisplayName $fn)
            url = "/saved-images/$fn"
        }
    }

    $base = if ($rawName) { [System.IO.Path]::GetFileNameWithoutExtension($rawName) } else { "resim" }
    $safeBase = ($base -replace '[^a-zA-Z0-9_-]', '_') -replace '_+', '_'
    $safeBase = $safeBase.Trim('_')
    if ([string]::IsNullOrWhiteSpace($safeBase)) { $safeBase = "resim" }
    if ($safeBase.Length -gt 24) { $safeBase = $safeBase.Substring(0, 24) }

    $stamp = [DateTime]::Now.ToString("yyyyMMdd_HHmmss")
    $filename = "${stamp}_${safeBase}_${hashHex}${ext}"
    $destPath = Join-Path $savedDir $filename
    [System.IO.File]::WriteAllBytes($destPath, $bytes)

    return @{
        ok = $true
        filename = $filename
        name = (Get-DisplayName $filename)
        url = "/saved-images/$filename"
    }
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Output "Server running on http://localhost:$Port/"

$fullBase = [System.IO.Path]::GetFullPath($baseDir)
if (-not $fullBase.EndsWith("\")) { $fullBase += "\" }

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
        $method = $request.HttpMethod.ToUpper()
        $path = $request.Url.LocalPath

        if ($method -eq "GET" -and $path -eq "/api/recent-images") {
            $files = Get-ChildItem -Path $savedDir -File |
                Where-Object { $allowedExts -contains $_.Extension.ToLower() } |
                Sort-Object LastWriteTimeUtc -Descending

            $jsonItems = @()
            foreach ($f in $files) {
                $obj = @{
                    filename = $f.Name
                    name = (Get-DisplayName $f.Name)
                    url = "/saved-images/$($f.Name)"
                }
                $jsonItems += ($obj | ConvertTo-Json -Compress)
            }
            $jsonArray = "[" + ($jsonItems -join ",") + "]"
            Send-Json $response 200 $jsonArray
        }
        elseif ($method -eq "POST" -and $path -eq "/api/save-image") {
            $bytes = Read-RequestBytes $request
            if (-not $bytes -or $bytes.Length -eq 0) {
                Send-Json $response 400 '{"ok":false,"error":"Empty image"}'
            } else {
                $qName = $request.QueryString["name"]
                $ext = Get-ExtFromMeta $request.ContentType $qName ".png"
                $res = Save-ImageBytes $bytes $qName $ext
                Send-Json $response 200 ($res | ConvertTo-Json -Compress)
            }
        }
        elseif ($method -eq "POST" -and $path -eq "/api/save-url") {
            $bodyBytes = Read-RequestBytes $request
            $bodyText = [System.Text.Encoding]::UTF8.GetString($bodyBytes)
            $payload = $bodyText | ConvertFrom-Json
            $targetUrl = if ($payload -and $payload.url) { $payload.url.Trim() } else { "" }

            if (-not ($targetUrl -match '^https?://')) {
                Send-Json $response 400 '{"ok":false,"error":"Invalid URL"}'
            } else {
                $wc = New-Object System.Net.WebClient
                $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                $imgBytes = $wc.DownloadData($targetUrl)
                $respCt = $wc.ResponseHeaders["Content-Type"]
                $ext = Get-ExtFromMeta $respCt $targetUrl ".jpg"
                $urlBase = ([Uri]$targetUrl).Segments[-1]
                if ([string]::IsNullOrWhiteSpace($urlBase) -or $urlBase -eq "/") { $urlBase = "link_resmi" }
                $res = Save-ImageBytes $imgBytes $urlBase $ext
                Send-Json $response 200 ($res | ConvertTo-Json -Compress)
            }
        }
        elseif ($method -eq "POST" -and $path -eq "/api/delete-image") {
            $bodyBytes = Read-RequestBytes $request
            $bodyText = [System.Text.Encoding]::UTF8.GetString($bodyBytes)
            $payload = $bodyText | ConvertFrom-Json
            $fn = if ($payload -and $payload.filename) { [System.IO.Path]::GetFileName($payload.filename) } else { "" }
            if ($fn) {
                $target = Join-Path $savedDir $fn
                if (Test-Path $target) {
                    Remove-Item -Path $target -Force
                }
            }
            Send-Json $response 200 '{"ok":true}'
        }
        else {
            $localPath = $path.TrimStart('/')
            if ([string]::IsNullOrEmpty($localPath)) { $localPath = "index.html" }
            $filePath = Join-Path $baseDir ($localPath -replace '/', '\')
            $fullFile = [System.IO.Path]::GetFullPath($filePath)

            if ($fullFile.StartsWith($fullBase, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path $fullFile -PathType Leaf)) {
                $ext = [System.IO.Path]::GetExtension($fullFile).ToLower()
                $contentType = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".svg"  { "image/svg+xml" }
                    ".png"  { "image/png" }
                    ".jpg"  { "image/jpeg" }
                    ".jpeg" { "image/jpeg" }
                    ".webp" { "image/webp" }
                    ".gif"  { "image/gif" }
                    default { "application/octet-stream" }
                }
                $response.ContentType = $contentType
                $bytes = [System.IO.File]::ReadAllBytes($fullFile)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
        }
    }
    catch {
        $errMsg = ($_.Exception.Message | ConvertTo-Json -Compress)
        try {
            Send-Json $response 500 ("{`"ok`":false,`"error`":$errMsg}")
        } catch {}
    }
    finally {
        try { $response.OutputStream.Close() } catch {}
    }
}
