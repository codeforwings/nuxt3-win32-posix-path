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
c:/progra~1/
c:/progra~2/
c:/progra~3/
#3 is program data
$env:PUBLIC
%PUBLIC%
 #>
```