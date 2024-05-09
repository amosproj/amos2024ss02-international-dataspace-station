
# Provider run

java -Dedc.keystore=resources/certs/cert.pfx -Dedc.keystore.password=123456 -Dedc.vault=resources/configuration/provider-vault.properties -Dedc.fs.config=resources/configuration/provider-configuration.properties -jar connector/build/libs/connector.jar

# Consumer run

java -Dedc.keystore=resources/certs/cert.pfx -Dedc.keystore.password=123456 -Dedc.vault=resources/configuration/consumer-vault.properties -Dedc.fs.config=resources/configuration/consumer-configuration.properties -jar connector/build/libs/connector.jar

# Register data plane

curl -H 'Content-Type: application/json' \
     -d @resources/dataplane/register-data-plane-provider.json \
     -X POST "http://localhost:19193/management/v2/dataplanes" -s | jq

# Create asset

curl -d @resources/create-asset.json \
  -H 'content-type: application/json' http://localhost:19193/management/v3/assets \
  -s | jq

# Create policy

curl -d @resources/create-policy.json \
  -H 'content-type: application/json' http://localhost:19193/management/v2/policydefinitions \
  -s | jq

# Create contract definition

curl -d @resources/create-contract-definition.json \
  -H 'content-type: application/json' http://localhost:19193/management/v2/contractdefinitions \
  -s | jq

# Fetch catalog

curl -X POST "http://localhost:29193/management/v2/catalog/request" \
    -H 'Content-Type: application/json' \
    -d @resources/fetch-catalog.json -s | jq

# Negotiate contract

replace {{contract-offer-id}} in negotiate-contract.json

curl -d @resources/negotiate-contract.json \
  -X POST -H 'content-type: application/json' http://localhost:29193/management/v2/contractnegotiations \
  -s | jq

# Getting contract agreement id

replace {{contract-negotiation-id}}

curl -X GET "http://localhost:29193/management/v2/contractnegotiations/{{contract-negotiation-id}}" \
    --header 'Content-Type: application/json' \
    -s | jq
