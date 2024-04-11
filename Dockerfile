# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
# Removed the line copying nginx.conf to avoid confusion

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
