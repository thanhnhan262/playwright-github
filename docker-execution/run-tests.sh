#!/bin/bash

# Set variables
REPO_URL="https://github.com/your-organization/your-repo.git"
TARGET_DIR="/app/tests"

# Clean up any previous clone
if [ -d "$TARGET_DIR" ]; then
    echo "Removing existing test directory..."
    rm -rf "$TARGET_DIR"
fi

# Clone the repository
echo "Cloning repository..."
git clone "$REPO_URL" "$TARGET_DIR"

# Navigate to the test directory
cd "$TARGET_DIR"

# Install dependencies
echo "Installing dependencies..."
npm install

# Run Playwright tests
echo "Running Playwright tests..."
npx playwright test
