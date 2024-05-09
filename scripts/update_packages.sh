#!/bin/sh

# Colors
NORMAL='\033[0m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'

# Check if user wants to automatically update packages
if [ "$1" = "-y" ] || [ "$1" = "--yes" ]; then
  bypass_prompt=true
else
  bypass_prompt=false
fi

# Script to bump minor version of outdated packages in package.json
npm outdated | tail -n +2 | while read line
do
  # npm outdated columns: Package, Current, Wanted, Latest, Depended by
  package=$(echo $line | awk '{print $1}')
  current=$(echo $line | awk '{print $2}')
  wanted=$(echo $line | awk '{print $3}')
  latest=$(echo $line | awk '{print $4}')

  # Show user version details
  version_message=""
  if [ "$current" != "$wanted" ]; then
    version_message="${YELLOW}$package${NORMAL}."
  else
    version_message="${YELLOW}$package${NORMAL} cannot be updated."
  fi
  version_message="${version_message} Current: ${GREEN}$current${NORMAL}, Wanted: ${GREEN}$wanted${NORMAL}"
  if [ "$wanted" != "$latest" ]; then
    version_message="${version_message}, Major version ${BLUE}$latest${NORMAL} available"
  fi
  echo $version_message

  # Update any packages that are outdated
  if [ "$current" != "$wanted" ]; then
    if [ "$bypass_prompt" = true ]; then
      answer="y"
    else
      # Prompt user to update package
      echo "Do you want to update $package to $wanted? (y/n)"
      read -u 3 answer
    fi

    if [ "$answer" = "y" ] || [ "$answer" = "Y" ] || [ "$answer" = "yes" ] || [ "$answer" = "YES" ]; then
      # Update package
      npm install $package@$wanted > /dev/null 2>&1

      if [ $? -eq 0 ]; then
        echo "$package is updated to $wanted\n"
      else
        echo "$package failed to update to $wanted\n"
      fi
    fi
  fi
done 3</dev/tty
