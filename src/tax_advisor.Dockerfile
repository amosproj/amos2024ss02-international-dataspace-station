FROM gradle:jdk17 AS build
WORKDIR /amos
COPY --chown=gradle:gradle . /amos

EXPOSE 29191
EXPOSE 29192
EXPOSE 29193
EXPOSE 29194
EXPOSE 29291

RUN gradle connector:build

CMD ["java", "-Dedc.keystore=resources/certs/cert.pfx", "-Dedc.keystore.password=123456", "-Dedc.vault=resources/configuration/tax_advisor-vault.properties", "-Dedc.fs.config=resources/configuration/tax_advisor-configuration.properties", "-jar", "connector/build/libs/connector.jar"]

