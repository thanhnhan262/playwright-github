#!/bin/bash

# Set variables
REPO_URL="https://$GIT_USER:$GIT_TOKEN@github.com/thanhnhan262/playwright-github.git"
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
echo "Installing project dependencies..."
npm ci
npx playwright install --with-deps

# Run Playwright tests
echo "Running Playwright tests..."
npx playwright test

# Copy test results to the host
echo "Copying test report to mounted directory..."
cp -r /app/tests/playwright-report/ /app/playwright-report
