FROM openjdk:17-slim-buster

RUN apt update \
    && apt install -y uuid-runtime jq \
    && rm -rf /var/cache/apt/archives /var/lib/apt/lists

WORKDIR /app

COPY cli-tools/registration-service-cli.jar .
COPY cli-tools/identity-hub-cli.jar .

COPY participants ./participants

CMD ["java", "-jar", "registration-service-cli.jar", "-d=\"did:web:did-server:registration-service\"", "--http-scheme", "-k=./participants/bank/resources/vault/private-key.pem", "-c=\"did:web:did-server:bank\"", "participants", "add"]