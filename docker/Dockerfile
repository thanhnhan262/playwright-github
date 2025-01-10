# Use the official Node.js image as the base
FROM node:20-bookworm

# Install Playwright and its dependencies
RUN npx -y playwright install --with-deps

# Set the working directory
WORKDIR /app

# Copy and execute a script to clone and run tests
COPY run-tests.sh /run-tests.sh
RUN chmod +x /run-tests.sh

# Default command to run tests
CMD ["/run-tests.sh"]

