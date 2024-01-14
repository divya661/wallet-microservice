# Use an official Node runtime as a base image
FROM --platform=linux/amd64 node:18-alpine

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@latest
RUN npm cache clean --force
RUN npm install --force

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Set the backend URL environment variable
ARG BACKEND_URL
ENV BACKEND_URL $BACKEND_URL
# Copy the rest of the application code to the container
COPY . .

# Build the React app (you might adjust this based on your build process)
RUN npm run build
COPY ./server.js ./build/server.js
# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "build/server.js"]
