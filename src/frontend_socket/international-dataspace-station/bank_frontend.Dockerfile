FROM node:22-alpine

WORKDIR /amos

COPY --chown=node:node . .

ENV CONNECTOR_NAME=bank
ENV CLOUD_DOMAIN=amos.cloudness.dev
ENV RUNNING_ENV=local

RUN apk update
RUN apk add --no-cache curl jq

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000


ENV NEXT_PUBLIC_INITIAL_PAGE=bank

CMD npm run dev
