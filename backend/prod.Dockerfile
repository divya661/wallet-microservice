# /backend/Dockerfile
FROM --platform=linux/amd64 node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

ARG DB_HOST
ENV DB_HOST $DB_HOST
ARG DB_USERNAME
ENV DB_USERNAME $DB_USERNAME
ARG DB_PASSWORD
ENV DB_PASSWORD $DB_PASSWORD
ARG DB_PORT
ENV DB_PORT $DB_PORT
ARG DB_NAME
ENV DB_NAME $DB_NAME

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
