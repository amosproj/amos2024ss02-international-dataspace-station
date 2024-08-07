FROM gradle:jdk17 AS build
WORKDIR /app
COPY --chown=gradle:gradle . /app

EXPOSE 8080

ENV CONNECTOR_NAME=company

RUN gradle build

CMD ["java", "-jar", "build/libs/filestorage-database.jar"]

