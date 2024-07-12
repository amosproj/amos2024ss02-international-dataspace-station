FROM gradle:jdk17 AS build
WORKDIR /app
COPY --chown=gradle:gradle . /app
RUN ./gradlew build

FROM openjdk:17-alpine
ENV CONNECTOR_NAME=bank
WORKDIR /app
COPY --from=build /app/build/libs/filestorage-database.jar .
EXPOSE 8080
CMD ["java", "-jar", "filestorage-database.jar"]
