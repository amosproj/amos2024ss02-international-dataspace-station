FROM gradle:jdk17 AS build
WORKDIR /amos
COPY --chown=gradle:gradle . /amos
COPY ./participants/taxadvisor/resources /resources

EXPOSE 29191
EXPOSE 29192
EXPOSE 29193
EXPOSE 29194
EXPOSE 29195
EXPOSE 29291

ENV EDC_FS_CONFIG=/resources/taxadvisor-configuration.properties
ENV EDC_DSP_CALLBACK_ADDRESS=http://taxadvisor:29194/api/dsp
ENV EDC_CONNECTOR_NAME=taxadvisor
ENV EDC_PARTICIPANT_ID=did:web:did-server:taxadvisor
ENV EDC_BLOBSTORE_ENDPOINT_TEMPLATE="http://azurite:10000/%s"
ENV EDC_IDENTITY_DID_URL=did:web:did-server:taxadvisor
ENV EDC_VAULT=/resources/vault/taxadvisor-vault.properties
ENV EDC_KEYSTORE=/resources/vault/taxadvisor-keystore.jks
ENV EDC_SELF_DESCRIPTION_DOCUMENT_PATH=/resources/sdd.json
ENV EDC_KEYSTORE_PASSWORD=test123
ENV EDC_API_AUTH_KEY=ApiKeyDefaultValue
ENV EDC_IAM_DID_WEB_USE_HTTPS="false"
ENV EDC_CATALOG_CACHE_EXECUTION_DELAY_SECONDS=5
ENV EDC_CATALOG_CACHE_EXECUTION_PERIOD_SECONDS=5
ENV EDC_CATALOG_CACHE_PARTITION_NUM_CRAWLERS=5
ENV EDC_DATAPLANE_TOKEN_VALIDATION_ENDPOINT=http://taxadvisor:39192/api/control/token
ENV REGISTRATION_SERVICE_API_URL=http://registration-service:8184/api/authority
ENV EDC_WEB_REST_CORS_ENABLED="true"
ENV EDC_WEB_REST_CORS_HEADERS="origin,content-type,accept,authorization,x-api-key"

RUN gradle launchers:connector:build

CMD ["java", "-jar", "launchers/connector/build/libs/connector.jar"]