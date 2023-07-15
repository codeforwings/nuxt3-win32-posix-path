#!pwsh.exe

<#
Test powershell inside of mocha... source and import?
cd C:\Users\Jason\WebstormProjects\nuxt3-win32-posix-path
pwsh.exe -File pwsh-test-mocha.ps1 c:\hi
#>

# import-module -Name ./src/win32ToWin32WSL/win32ToWin32WSL2.ps1 -Function pathWin32ToPosix
# source 
# powershell -Command ./src/win32ToWin32WSL/win32ToWin32WSL2.ps1; pathWin32ToPosix 'c:\hi'
clear-host
write-host hi $args[0]
# . ./src/win32ToWin32WSL/win32ToWin32WSL2.ps1;
# pathWin32ToPosix $args[0]

