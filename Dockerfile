# Use an official lightweight Node.js image for the build stage
FROM node:18.13-alpine as build

# Creating a virtual directory inside the Docker image
WORKDIR /app

# Copying files from the local machine to the virtual Docker image directory
COPY . .

# Installing dependencies for the project
RUN npm install

# Installing Angular CLI globally
RUN npm install -g @angular/cli

# Creating the Angular build
RUN ng build --configuration=production

# Defining the nginx image for the second stage
FROM nginx:1.20 as ngx

# Copying compiled code from the build stage to the nginx folder for serving
COPY --from=build /app/dist/albion_market /usr/share/nginx/html

# Copying nginx config from local to image
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposing internal port
EXPOSE 80
