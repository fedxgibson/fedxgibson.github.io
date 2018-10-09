if [ -z "$1" ]
  git add -A
  git commit -m "$1"
  git push origin master:src
  git subtree push --prefix dist origin master
then
  echo Commit message not provided.
  exit
fi
