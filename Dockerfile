#어떤 이미지로부터 새로운 이미지를 생성할지를 지정
FROM node:alpine as develop-stage

# Create app directory
WORKDIR /app

#Dockerfile 을 생성/관리하는 사람
MAINTAINER JinHak Wee <wlsgkr91@gmail.com>

COPY package*.json ./

# npm install 을 실행
RUN express
RUN npm install

COPY . .

#가상 머신에 오픈할 포트
EXPOSE 80

#컨테이너에서 실행될 명령을 지정
CMD ["npm", "start"]