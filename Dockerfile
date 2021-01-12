FROM node:alpine

COPY ./package*.json ./

RUN npm install

COPY ./index.js ./


ENTRYPOINT ["node", "index.js"]
