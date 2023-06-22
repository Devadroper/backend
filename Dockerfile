FROM node:16-alpine

WORKDIR /

RUN mkdir /app

COPY package*.json /app/

RUN npm ci --omit=dev

COPY . /app/

WORKDIR /app

CMD [ "npm", "start" ]
