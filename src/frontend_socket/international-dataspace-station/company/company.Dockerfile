# Use Node.js base image with Alpine Linux
FROM node:14-alpine

# Set the user to node for security
USER node

# Create the directory for the app and set permissions
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory inside the container
WORKDIR /home/node/app

# Copy package.json and package-lock.json files to the container
COPY company/package.json company/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application (if applicable for Next.js or frontend build)
RUN npm run build

# Expose port 3001 (custom port for company connector)
EXPOSE 3001

# Command to start the company connector frontend
CMD [ "npm", "run", "start:company" ]
