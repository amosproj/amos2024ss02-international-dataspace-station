FROM node:22-alpine

USER root

RUN mkdir -p /amos/node_modules && chown -R node:node /amos

WORKDIR /amos

COPY --chown=node:node . .

RUN apk update
RUN apk add --no-cache curl jq

COPY frontend_socket/international-dataspace-station/package.json frontend_socket/international-dataspace-station/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .

COPY --chown=node:node frontend_socket/international-dataspace-station/. .

RUN npm install --loglevel verbose

EXPOSE 3000

CMD [ "npm", "run", "dev" ]