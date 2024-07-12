FROM node:22-alpine AS dependencies
WORKDIR /amos
COPY package*.json .
RUN npm install

FROM node:22-alpine AS build
WORKDIR /amos
COPY --from=dependencies /amos/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /amos
COPY --from=build /amos .
RUN apk update
RUN apk add --no-cache curl jq
RUN apk add docker

ARG RUNNING_ENV=local
ENV RUNNING_ENV=${RUNNING_ENV}

ENV NEXT_PUBLIC_CONNECTOR_NAME=bank
ENV CLOUD_DOMAIN=amos.cloudness.dev
ENV AUTH_SECRET=kVJNSZuX/mIGvO3scL8p1c49quBPf2r/HAkIGfVvfbIQ
ENV AUTH_TRUST_HOST=true

EXPOSE 3000

CMD npm start
