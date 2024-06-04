FROM node:22-alpine

USER node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY frontend_socket/international-dataspace-station/package.json frontend_socket/international-dataspace-station/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .

COPY --chown=node:node frontend_socket/international-dataspace-station/. .

RUN npm install --loglevel verbose

EXPOSE 3000

CMD [ "npm", "run", "dev" ]