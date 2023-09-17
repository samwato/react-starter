#!/bin/sh

# Setup pre-commit hook
echo "\
#!/bin/sh
npm run check
exit \$?
" > .git/hooks/pre-commit

chmod +x .git/hooks/pre-commit

# Install Dependencies
npm ci

# Create build dir
mkdir -p www/dist
