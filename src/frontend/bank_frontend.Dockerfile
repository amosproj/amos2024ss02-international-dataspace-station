FROM node:22-alpine

WORKDIR /amos

COPY --chown=node:node . .

COPY app/participants/bank ./app/
COPY data/participants/bank ./data/

ARG RUNNING_ENV=local
ENV RUNNING_ENV=${RUNNING_ENV}

ENV NEXT_PUBLIC_CONNECTOR_NAME=bank
ENV CLOUD_DOMAIN=amos.cloudness.dev

RUN apk update
RUN apk add --no-cache curl jq
RUN apk add docker

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev
