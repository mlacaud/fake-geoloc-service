FROM node:alpine

COPY . /server/

WORKDIR /server

ENTRYPOINT ["node", "index.js"]
