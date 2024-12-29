#!/usr/bin/env bash

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "nvm is not installed. Please install nvm first:"
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

# Install and use the correct Node version
echo "Installing Node.js version specified in .nvmrc..."
nvm install
nvm use

# Install dependencies
echo "Installing project dependencies..."
pnpm install

echo "Setup complete! You can now start developing."
