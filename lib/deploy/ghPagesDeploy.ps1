#!/usr/bin/env pwsh
<#
  try being run with powershell.exe or pwsh? doesnt matter i guess
    ERROR  EPERM: operation not permitted, mkdir 'C:\Users\Jason\WebstormProjects\nuxt3-win32-posix-path\.nuxt'
 ERROR  [vite]: Rollup failed to resolve import "##/lib/dist/index.mjs" from "app.vue".

 cd ../nuxt3-win32-posix-path
 ls |grep --color='auto' vite.config

 Test-Path -Path vite.config.mjs

 delete
 .output
 .nuxt
 dist
 #>

 #>
 #>

#>

# 1. verify pwd is like nuxt3-win32-posix-path
# $pwd=(Get-Location).Path
if($pwd -notmatch "nuxt3-win32-posix-path"){
  Write-Host "pwd is not nuxt3-win32-posix-path"
  $pwd
  exit
}
# 2. verify node / maybe pnpm
$isNod316=node -v | Select-String -Pattern "v16" -Quiet
if(!$isNod316){
  Write-Host "node version 16 required"
  Write-Host "nvm install 16"
  Write-Host "nvm use 16"
  exit
}
# delete .nuxt if exists... just because bug
if(Test-Path -Path .nuxt){
  Write-Host "delete .nuxt"
  Remove-Item -Path .nuxt -Recurse -Force
}

# move vite.config.mjs to .bak.vite.config.mjs
## if exists
if(Test-Path -Path vite.config.mjs){
  # Write-Host "vite.config.mjs exists"
  # Write-Host "move vite.config.mjs to .bak.vite.config.mjs"
  Move-Item -Path vite.config.mjs -Destination .bak.vite.config.mjs.bak -PassThru
}else{

}
# runner:
pnpm run ghGenerateAndDeploy

# move back
if(Test-Path -Path .bak.vite.config.mjs.bak){
  Move-Item -Path .bak.vite.config.mjs.bak -Destination vite.config.mjs
  # Move-Item -Path .bak.vite.config.mjs -Destination vite.config.mjs
}else{
  Write-Host ".bak.vite.config.mjs does not exist... something is wrong?"
  Write-Host "ghpagesDeploy will also set vite.config.mjs back to original"
}
write-host "https://codeforwings.github.io/nuxt3-win32-posix-path/"
