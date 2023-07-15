#!/usr/bin/env fish
# can't end with \' or \"
# echo 'c\'
# echo "c\"
 echo c\

# work
echo 'c\hi'
echo "c\hi"
echo "c\\hi"
echo c\\hi

# no work:
echo c\hi


# Home
echo ~
echo ~/repo
## quotes dont work at all with echo at least
echo "~"
echo '~'
echo "~/repo"
echo '~/repo'
echo "$HOME" # works
echo '$HOME'
echo "$HOME/repo" # works
echo '$HOME/repo'
