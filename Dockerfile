FROM node:alpine
COPY . /usr/share/app/
EXPOSE 80
CMD ["npm","start"]