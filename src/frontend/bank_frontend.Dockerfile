FROM node:22-alpine

WORKDIR /amos

RUN apk update
RUN apk add --no-cache curl jq

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev