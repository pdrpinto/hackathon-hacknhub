FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with force flag
RUN npm install --legacy-peer-deps --force

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Set environment variable
ENV CHOKIDAR_USEPOLLING=true

# Start app
CMD ["npm", "start"]


