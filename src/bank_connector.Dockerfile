FROM gradle:jdk17 AS build
WORKDIR /amos
COPY --chown=gradle:gradle . /amos

EXPOSE 39191
EXPOSE 39192
EXPOSE 39193
EXPOSE 39194
EXPOSE 39291

RUN ./gradlew connector:build

CMD ["java", "-Dedc.keystore=resources/certs/cert.pfx", "-Dedc.keystore.password=123456", "-Dedc.vault=resources/configuration/bank-vault.properties", "-Dedc.fs.config=resources/configuration/bank-configuration.properties", "-jar", "connector/build/libs/connector.jar"]

