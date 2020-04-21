FROM node:10.17.0-alpine

# install bash
RUN apk add bash

WORKDIR /home/src

COPY package*.json ./

# Setting unsafe-perm for prepare script to execute on a private repo dependency
RUN npm set progress=false && npm config set unsafe-perm true && npm install -g tsoa && npm install

COPY . .
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "server"]