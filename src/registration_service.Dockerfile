FROM gradle:jdk17 AS build
WORKDIR /amos
COPY --chown=gradle:gradle . /amos
COPY ./participants/registration-service/resources /resources

EXPOSE 8181
EXPOSE 7171
EXPOSE 8184
EXPOSE 5008

ENV WEB_HTTP_PORT="8181"
ENV WEB_HTTP_PATH="/api"
ENV WEB_HTTP_IDENTITY_PORT="7171"
ENV WEB_HTTP_IDENTITY_PATH="/api/identity"
ENV WEB_HTTP_AUTHORITY_PORT="8184"
ENV WEB_HTTP_AUTHORITY_PATH="/api/authority"
ENV JWT_AUDIENCE=http://registration-service:8184/api/authority
ENV EDC_IAM_DID_WEB_USE_HTTPS="false"
ENV EDC_CONNECTOR_NAME=registration-service
ENV EDC_IDENTITY_DID_URL=did:web:did-server:registration-service
ENV EDC_SELF_DESCRIPTION_DOCUMENT_PATH=/resources/sdd.json
ENV EDC_VAULT=/resources/vault/registration-service-vault.properties
ENV EDC_VAULT_NAME=vault
ENV EDC_KEYSTORE=/resources/vault/registration-service-keystore.jks
ENV EDC_KEYSTORE_PASSWORD=test123
ENV EDC_ERROR_RESPONSE_VERBOSE="true"


RUN gradle -DuseFsVault="true" launchers:registrationservice:build

CMD ["java", "-jar", "launchers/registrationservice/build/libs/registrationservice.jar"]