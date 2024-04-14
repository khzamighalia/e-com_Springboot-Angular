# Use the official Node.js 14 image as a base
FROM node:18.13 as build

# Set the working directory in the container
WORKDIR /src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use NGINX to serve the built Angular app
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html
