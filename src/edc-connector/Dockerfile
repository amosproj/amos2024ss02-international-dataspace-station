FROM gradle:jdk17 AS build
WORKDIR /amos
COPY --chown=gradle:gradle . /amos

EXPOSE 19191
EXPOSE 19192
EXPOSE 19193
EXPOSE 19194
EXPOSE 19291

ENV EDC_CONFIG=resources/configuration/bank-configuration.properties

RUN ./gradlew connector:build

CMD ["java", "-Dedc.fs.config=${EDC_CONFIG}", "-jar", "connector/build/libs/connector.jar"]

