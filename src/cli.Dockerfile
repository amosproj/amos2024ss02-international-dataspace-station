FROM openjdk:17-slim-buster

RUN apt update \
    && apt install -y uuid-runtime jq \
    && rm -rf /var/cache/apt/archives /var/lib/apt/lists

WORKDIR /app

COPY cli-tools/registration-service-cli.jar .
COPY cli-tools/identity-hub-cli.jar .

COPY cli-tools/register-participants.sh .
COPY cli-tools/validate-onboarding.sh .

COPY cli-tools/participants.json .

COPY participants ./participants

ENTRYPOINT "/app/register-participants.sh"