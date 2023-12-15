# Use an official lightweight Node.js image
FROM node:18.13-alpine as build

#Accepting build-arg to create environment specific build
#it is useful when we have multiple environment (e.g: dev, tst, staging, prod)
#default value is development
ARG build_env=development

#Creating virtual directory inside docker image
WORKDIR /app

RUN npm cache clean --force

#Copying file from local machine to virtual docker image directory
COPY . .

#installing deps for project
RUN npm install

#creating angular build
RUN ./node_modules/@angular/cli/bin/ng build --configuration=$build_env

#STEP-2 RUN
#Defining nginx img 
FROM nginx:1.20 as ngx

#copying compiled code from dist to nginx folder for serving
COPY --from=node-helper /app/dist/angular-docker-blog /usr/share/nginx/html

#copying nginx config from local to image
COPY /nginx.conf /etc/nginx/conf.d/default.conf

#exposing internal port
EXPOSE 80