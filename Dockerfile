FROM node:10.15.0-alpine
EXPOSE 3000 9229

WORKDIR /api

COPY package.json /api
COPY package-lock.json /api

RUN npm ci

COPY . /api 

CMD npm run init && npm run start
