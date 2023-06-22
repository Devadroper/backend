FROM node:16-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install --omit=dev

CMD [ "npm", "start" ]