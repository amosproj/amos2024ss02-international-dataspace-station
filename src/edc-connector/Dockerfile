FROM gradle:jdk17 AS build
WORKDIR /amos
COPY --chown=gradle:gradle . /amos
RUN ./gradlew connector:build

FROM openjdk:17-alpine
WORKDIR /amos
COPY --from=build /amos .

ENV EDC_CONFIG=resources/configuration/bank-configuration.properties

EXPOSE 19191
EXPOSE 19192
EXPOSE 19193
EXPOSE 19194
EXPOSE 19291

CMD java -Dedc.fs.config=$EDC_CONFIG -jar connector/build/libs/connector.jar
