
# Use the official Playwright image as the base
FROM node:20-slim

# Install git for cloning repositories
RUN apt-get update && apt-get install -y git
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Playwright and its dependencies
RUN npx -y playwright@1.53.0 install --with-deps

# Set the working directory
WORKDIR /app

# Copy and execute a script to clone and run tests
COPY run-tests.sh /run-tests.sh
RUN chmod +x /run-tests.sh

# Default command to run tests
CMD ["bash", "-c", "/run-tests.sh $@"]

