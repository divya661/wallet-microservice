# /backend/Dockerfile
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the NODE_ENV to development
ENV NODE_ENV=development

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
