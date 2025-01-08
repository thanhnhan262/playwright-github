# Use the official Node.js image as the base
FROM mcr.microsoft.com/playwright:focal

# Set the working directory
WORKDIR /app

# Install Git to enable cloning repositories
RUN apt-get update && apt-get install -y git && apt-get clean

# Ensure Playwright dependencies are installed
RUN npx playwright install

# Copy and execute a script to clone and run tests
COPY run-tests.sh /run-tests.sh
RUN chmod +x /run-tests.sh

# Default command to run tests
CMD ["/run-tests.sh"]

