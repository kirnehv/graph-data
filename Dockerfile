### STAGE 1: Build ###
FROM node:latest as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm i -D --save-exact mini-css-extract-plugin@2.4.5
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:alpine as graph-data
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
