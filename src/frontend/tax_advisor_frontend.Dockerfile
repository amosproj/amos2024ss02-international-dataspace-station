FROM node:22-alpine

WORKDIR /amos

COPY --chown=node:node . .

ARG RUNNING_ENV=local
ENV RUNNING_ENV=${RUNNING_ENV}

ENV NEXT_PUBLIC_CONNECTOR_NAME=taxadvisor
ENV CLOUD_DOMAIN=amos.cloudness.dev
ENV AUTH_SECRET=kVJNSZuX/mIGvO3scL8p1c49quBPf2r/HAkIGfVvfbIQ

RUN apk update
RUN apk add --no-cache curl jq
RUN apk add docker

RUN npm install

RUN npm run build

EXPOSE 3000

CMD npm start
