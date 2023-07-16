#!/usr/bin/env bash.exe
# cd /mnt/c/Users/Jason/WebstormProjects/nuxt3-win32-posix-path
# c:/cygwin64/bin/env.exe
cd /mnt/c/Users/Jason/WebstormProjects/nuxt3-win32-posix-path
PROOT="/mnt/c/Users/Jason/WebstormProjects/nuxt3-win32-posix-path"
NODE="/mnt/c/Users/Jason/AppData/Roaming/nvm/v16.20.1/node.exe"
$NODE -v
pwd
# get current file directory
parentDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo $parentDir
echo "$parentDir/generate-env.mjs"
# export NODE_FIRST_ARG="cygwin"; $NODE "$parentDir/generate-env.mjs"
export NODE_PATH="/mnt/c/Users/Jason/WebstormProjects/nuxt3-win32-posix-path/node_modules/.pnpm/node_modules"
export NODE_FIRST_ARG="cygwin"; $NODE "$PROOT/dev/node-fs-utils-dev/tests/dev-specific/generate-env.mjs"
