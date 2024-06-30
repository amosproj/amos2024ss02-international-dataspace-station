FROM gradle:jdk17 AS build
WORKDIR /amos
COPY --chown=gradle:gradle . /amos

EXPOSE 19191
EXPOSE 19192
EXPOSE 19193
EXPOSE 19194
EXPOSE 19291

RUN ./gradlew connector:build

CMD ["java", "-Dedc.keystore=resources/certs/cert.pfx", "-Dedc.keystore.password=123456", "-Dedc.vault=resources/configuration/bank-vault.properties", "-Dedc.fs.config=resources/configuration/bank-configuration.properties", "-jar", "connector/build/libs/connector.jar"]

