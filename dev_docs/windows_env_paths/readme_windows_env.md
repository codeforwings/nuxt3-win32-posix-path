# Windows Environment Paths / Variables
[superuser](https://superuser.com/questions/1655266/a-complete-list-of-relative-paths-variables-in-windows-explorer-in-widows-1)
```bash
# this is cmd.exe / .bat envs
# start menu
# Volatile - These are set at logon
LOGONSERVER=\\LAPTOP
USERDOMAIN=LAPTOP
USERNAME=David Candy
USERPROFILE=C:\Users\David Candy
HOMEPATH=\Users\David Candy
HOMEDRIVE=C:
APPDATA=C:\Users\David Candy\AppData\Roaming
LOCALAPPDATA=C:\Users\David Candy\AppData\Local
USERDOMAIN_ROAMINGPROFILE=LAPTOP

# user
ALLUSERSPROFILE=C:\ProgramData
APPDATA=C:\Users\David Candy\AppData\Roaming
CommonProgramFiles=C:\Program Files\Common Files
CommonProgramFiles(x86)=C:\Program Files (x86)\Common Files
CommonProgramW6432=C:\Program Files\Common Files
USERDOMAIN=LAPTOP
USERDOMAIN_ROAMINGPROFILE=LAPTOP
USERNAME=David Candy
USERPROFILE=C:\Users\David Candy
windir=C:\Windows
```
# Get list of envs
```ps1
set
ls env:


```
# Set / unset in ps1
```ps1
# this persists...
[Environment]::SetEnvironmentVariable('Foo', 'Bar', 'Machine')
[Environment]::SetEnvironmentVariable('Foo', '', 'Machine')
```
# Home directory
```bash
%homepath%

```

# using pkg to export the exe
* for cross platform url util?


# also program files
```powershell
<#
c:/progra~1/
c:/progra~2/
c:/progra~3/
#3 is program data
$env:PUBLIC
%PUBLIC%
"/cygdrive/c/"

 #>
```
* node uses CMD envs...
* note use process.env



# https://sidd.io/2023/01/github-copilot-self-signed-cert-issue/
# PAC
# Docker Fedora install powershell
```bash
docker image ls
docker run -it --rm bookworm:latest

docker run -it --rm --hostname deb-network deb-network 
```

# Powershell ExpExperiemtn
```bash
# https://learn.microsoft.com/en-us/powershell/scripting/install/install-debian?view=powershell-7.3
# only debian 10 or 11...
# fedora?
docker run -it --rm --hostname deb11 --name deb11 debian:11

###################################
# Prerequisites

# Update the list of packages
sudo apt-get update

# Install pre-requisite packages.
sudo apt-get install -y wget

# Get the version of Debian
source /etc/os-release

# Download the Microsoft repository GPG keys
wget -q https://packages.microsoft.com/config/debian/$VERSION_ID/packages-microsoft-prod.deb

# Register the Microsoft repository GPG keys
sudo dpkg -i packages-microsoft-prod.deb

# Delete the the Microsoft repository GPG keys file
rm packages-microsoft-prod.deb

# Update the list of packages after we added packages.microsoft.com
sudo apt-get update

###################################
# Install PowerShell
sudo apt-get install -y powershell

# Start PowerShell
pwsh
Get-ChildItem Env:
printenv

[Environment]::GetEnvironmentVariable('Foo', 'Machine')
[Environment]::SetEnvironmentVariable('Foo', 'Bar', 'Machine')
[Environment]::SetEnvironmentVariable('Foo', '', 'Machine')

# doesnt work... as expected though
```

```powershell
# very slow script for some reason. also double appends ';'
$pathsToAdd = @(
   'C:\cygwin64\bin',
)
# loop for user or machine
$existingPath = [Environment]::GetEnvironmentVariable('Path', 'User')
[Environment]::GetEnvironmentVariable('Path', 'User')


# download would be iwc
$ogPref=$ProgressPreference # default is Continue
$ProgressPreference = 'SilentlyContinue'    # hide iwr progress bar
Invoke-WebRequest -Uri 'https://cygwin.com/setup-x86_64.exe' -OutFile 'C:\cygwin64\setup-x86_64.exe'
$ProgressPreference = 'Continue'            # Subsequent calls do display UI.
$ProgressPreference = $ogPref            # Subsequent calls do display UI.
[Environment]::GetEnvironmentVariable('NODE_EXTRA_CA_CERTS', 'Machine') # needs admin
[Environment]::SetEnvironmentVariable('NODE_EXTRA_CA_CERTS', '','Machine')


[Environment]::GetEnvironmentVariable('NODE_EXTRA_CA_CERTS', 'User')
[Environment]::SetEnvironmentVariable('NODE_EXTRA_CA_CERTS', '','User')


#$existingPath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
$currentPaths = $existingPath.Split(';')

foreach ($pathToAdd in $pathsToAdd) {
    if (-not $currentPaths.Contains($pathToAdd)) {
        $currentPaths += $pathToAdd
    }
}

$newPath = $currentPaths -join ';'
[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
#[Environment]::SetEnvironmentVariable('Path', $newPath, 'Machine')

# merge latter. powershell params are too annoying
# loop for user
<#
[Environment]::GetEnvironmentVariable('Path', 'User')
#>
```

# Docker windows 2022
```powershell

```

# 
```powershell
# if machine env NODE_EXTRA_CA_CERTS Completed
# user env doesnt require admin
if (-not [Environment]::GetEnvironmentVariable('NODE_EXTRA_CA_CERTS', 'User')) {
    # mkdir -p C:/ProgramData/AMD/CA_Certs/
    New-Item -Path 'C:\ProgramData\SOME_CA_Certs' -ItemType Directory -Force
    # check if SOME_CA.crt exists
    if (-not (Test-Path 'C:\ProgramData\SOME_CA_Certs\SOME_CA.crt')) {
        # download SOME_CA.crt
        $ProgressPreference = 'SilentlyContinue'    # hide iwr progress bar
        Invoke-WebRequest -Uri 'jasonchan.app/SOME_CA.crt' -OutFile 'C:\ProgramData\SOME_CA_Certs\SOME_CA.crt' # programdata isshared
        
    }
 
    [Environment]::SetEnvironmentVariable('NODE_EXTRA_CA_CERTS', 'C:\ProgramData\SOME_CA_Certs\SOME_CA.crt', 'User')
     
}
write-host "NODE_EXTRA_CA_CERTS:"
[Environment]::GetEnvironmentVariable('NODE_EXTRA_CA_CERTS', 'User')
```
