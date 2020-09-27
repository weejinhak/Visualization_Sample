
# develop stage
FROM node:alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN express
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm start

# production stage
EXPOSE 80
CMD ["npm", "start"]