if [ -z "$1" ]
then
  echo Commit message not provided.
  exit
fi
git add -A
git commit -m "$1"
git push origin master:src
git subtree push --prefix dist origin master
