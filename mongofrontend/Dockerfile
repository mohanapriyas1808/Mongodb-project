# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend React app
RUN npm run build

# Install a simple web server to serve the static files
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Command to serve the React build
CMD ["serve", "-s", "build"]
