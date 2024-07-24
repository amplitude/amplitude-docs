#!/bin/bash

# List of users
users=("markzegarelli" "SpencerFleury")

# Get the contributor of the last commit
last_contributor=$(git log -1 --pretty=format:'%an')

# Check if the last contributor is in the list of users
for user in "${users[@]}"
do
  if [ "$user" == "$last_contributor" ]; then
    echo "Contributor $last_contributor is in the list."
    exit 1
  fi
done

echo "Contributor $last_contributor is not in the list."
exit 0

git log -1 --pretty=oneline --abbrev-commit | grep -w "\[skip deploy\]" && exit 0 || exit 1