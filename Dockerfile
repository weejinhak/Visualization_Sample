# develop stage
FROM node:alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#Dockerfile 을 생성/관리하는 사람
MAINTAINER JinHak Wee <wlsgkr91@gmail.com>


# build stage
FROM develop-stage as build-stage
RUN npm run build

# production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]