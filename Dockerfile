# Use a base image with Node.js and Vite
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install dependencies
RUN npm ci

# Build the Vite app
RUN npm run build

# Use a lightweight server to serve the built app
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
