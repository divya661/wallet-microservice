# /frontend/Dockerfile
# Use an official Node runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@latest
RUN npm cache clean --force
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Set the NODE_ENV to development
ENV NODE_ENV=development

# Build the React app (you might adjust this based on your build process)
RUN npm run start

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
