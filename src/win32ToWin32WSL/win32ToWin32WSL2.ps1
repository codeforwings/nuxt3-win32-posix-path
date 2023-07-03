<#
#>
function pathWin32ToPosix { #
  param($inPathWin32,$spaceEscape = "\ ") #
  $inPathWin32 = $inPathWin32.trim() #
  $inPathWin32 = $inPathWin32.Replace('\\','\')
  $inPathWin32 = $inPathWin32.Replace('\','/')
  $inPathWin32 = $inPathWin32.Replace(' ',$spaceEscape) # space escape
  $inPathWin32 = $inPathWin32 -replace "^[`"`']", '' # remove leading quotes
  $inPathWin32 = $inPathWin32 -replace "[`"`']$", '' # remove ending quotes

  # .replace(/^["']/,'') #
    # .replace(/["']$/,'') #
    return $inPathWin32 #
}
#clear-host
#pathWin32ToPosix 'C:/Users/username/Downloads/' # "C:/Users/username/Downloads/"