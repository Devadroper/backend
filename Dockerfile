FROM node:16-alpine

WORKDIR /src/server

COPY package*.json ./

RUN npm install --omit=dev

COPY ./src ./src

CMD ["npm", "start"]