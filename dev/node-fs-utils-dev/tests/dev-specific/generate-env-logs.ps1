#!/usr/bin/env pwsh.exe
<#
  node
  pwsh.exe dev/node-fs-utils-dev/tests/dev-specific/generate-env-logs.ps1
  pwsh.exe dev/node-fs-utils-dev/tests/dev-specific/generate-env-logs.ps1 -NODE_FIRST_ARG "pwsh-cli"
  $env:NODE_FIRST_ARG="pwsh-man-cli";pwsh.exe dev/node-fs-utils-dev/tests/dev-specific/generate-env-logs.ps1
#>
# addd params
param(
  [string] $NODE_FIRST_ARG="pwsh-int"
)
if(!$env:NODE_FIRST_ARG){
  $env:NODE_FIRST_ARG=$NODE_FIRST_ARG
}
# set NODE_FIRST_ARG=$NODE_FIRST_ARG
# get current parent dir
$parentDir = Split-Path -Path $MyInvocation.MyCommand.Path -Parent
#
write-host "$parentDir/temp/$NODE_FIRST_ARG.txt"
c:/progra~1/PowerShell/7/pwsh.exe -c Get-ChildItem env: > "$parentDir/temp/$NODE_FIRST_ARG.txt"
#node "$parentDir/generate-env.mjs"
#which.exe node.exe
node.exe -v
write-host "$parentDir/generate-env.mjs"
