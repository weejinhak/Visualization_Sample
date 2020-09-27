
# develop stage
FROM node:alpine as develop-stage
# 앱 디렉터리 생성
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm install

# production stage
EXPOSE 80
CMD ["npm", "app.js"]