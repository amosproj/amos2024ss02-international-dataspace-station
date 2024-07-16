FROM gradle:jdk17 AS build
WORKDIR /amos
COPY --chown=gradle:gradle . /amos

EXPOSE 19191
EXPOSE 19192
EXPOSE 19193
EXPOSE 19194
EXPOSE 19291

RUN gradle connector:build

ENV EDC_FS_CONFIG=resources/configuration/bank-configuration.properties

CMD ["java", "-jar", "connector/build/libs/connector.jar"]

