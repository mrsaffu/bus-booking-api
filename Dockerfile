# Base image
FROM node:18

# Working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project
COPY . .

# Expose API port
EXPOSE 3000

# Start app
CMD ["npm", "run", "dev"]