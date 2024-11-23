# Base image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build application
RUN npm run build

# Expose port and run
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
