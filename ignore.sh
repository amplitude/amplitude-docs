#!/bin/bash

# List of users
users=("markzegarelli" "SpencerFleury" "Theodore Chao")

# Get the contributor of the last commit
last_contributor=$(git log -1 --pretty=format:'%an')
last_commit_message=$(git log -1 --pretty=format:'%s')

# Check if the last contributor is in the list of users
for user in "${users[@]}"
do
  if [ "$user" == "$last_contributor" ]; then
    echo "Contributor $last_contributor is in the list."
        if [[ "$last_commit_message" == *"[skip deploy]"* ]]; then
            echo "Commit message contains '[skip deploy]'."
            exit 0
        fi
    exit 1
  fi
done

echo "Contributor $last_contributor is not in the list."
exit 0