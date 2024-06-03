<p align="center"> <img src="https://raw.githubusercontent.com/amosproj/amos2024ss02-international-dataspace-station/main/Deliverables/sprint-01/Team%20Logo.jpg" alt="IDS" style="width:250px;height:250px;"> </p>

<h1 align="center"> International Dataspace Station </h1> 
<h3 align="center"> in collaboration with DATEV </h3>

## 📖 About

With the increase of data exchange among different sectors like finance, legal, healthcare, government and others, ensuring easy interoperability while still following data usage rules, policies, and local regulations is becoming increasingly important. **Dataspace** is the envisioned solution to tackle these challenges.

Dataspace operates with the help of **data connectors**, which enable secure and effective communication and exchange of data. They are a tool to connect many data endpoints to increase the pool of available data and to accelerate the data economy. By linking data connectors, dataspaces become protected environments where participants can freely share data. Data sovereignty, transparency and fairness are ensured by adherence to a set of rules.

Our goal is to explore the feasibiltiy of dataspace usage with regards to data sovereignty. This includes testing the maturity of dataspace, importance of the components and ease of deployment.

Learn in more detail about how our software works here: [IDS - Software Architecture][software_architecture]

## ⚡️ Requirements

If you want to run the connectors on your local machine, make sure that you have the following packages installed:

| Package  | Version |
| -------- | ------- |
| JDK  | 17  |
| Gradle  | 8.7 |
| jq  | 1.7.1 |
| Docker (optional) | 26 |


## 🐳 Docker usage

To run the code using docker containers, use the following commands in separate terminals for all three roles: tax advisor, company and bank connectors:

### 1. Build a docker image
```
mkdir docker-images
sudo docker build -t <company|tax_advisor|bank> . -f <company|tax_advisor|bank>.Dockerfile
sudo docker save -o ./docker-images/<company|tax_advisor|bank>.tar <company|tax_advisor|bank>
```
### 2. Load and run

```
sudo docker load -i ./docker-images/<company|tax_advisor|bank>.tar
sudo docker run -it -p <19193:19193|29193:29193|39193:39193> <company|tax_advisor|bank>
```

<span style="color:red"><b> Note: </b></span> If you are using macOS, you might have to modify the `config.json` file:
1. Go to `~/.docker/config.json`.
2. Change the `credsStore` value from `desktop` to `osxkeychain`.

Alternatively you may:
1. Go to `sudo vi  ~/.docker/config.json`.
2. Change `credsStore` to `credStore`.

## 🖥️ Running the connectors locally

If you don't want to use docker, you can run the connectors locally. Use the following commands in separate terminals:

### Company connector

In the first terminal, use the following command to run a company:

```
java -Dedc.keystore=resources/certs/cert.pfx -Dedc.keystore.password=123456 -Dedc.vault=resources/configuration/company-vault.properties -Dedc.fs.config=resources/configuration/company-configuration.properties -jar connector/build/libs/connector.jar
```

### Tax advisor connector

In the second terminal, use the following command to run a tax advisor:

```
java -Dedc.keystore=resources/certs/cert.pfx -Dedc.keystore.password=123456 -Dedc.vault=resources/configuration/tax_advisor-vault.properties -Dedc.fs.config=resources/configuration/tax_advisor-configuration.properties -jar connector/build/libs/connector.jar
```

### Bank connector

In the third terminal, use the following command to run a bank:

```
java -Dedc.keystore=resources/certs/cert.pfx -Dedc.keystore.password=123456 -Dedc.vault=resources/configuration/bank-vault.properties -Dedc.fs.config=resources/configuration/bank-configuration.properties -jar connector/build/libs/connector.jar
```

## 🔗 Establishing connection for data exchange

In the third (main) terminal, use the following HTTP requests to establish a connection between the provider and the consumer to be able to exchange data:

#### 1. Register data plane

```
curl -H 'Content-Type: application/json' \
     -d @resources/dataplane/register-data-plane-provider.json \
     -X POST "http://localhost:19193/management/v2/dataplanes" -s | jq
```

#### 2. Create an asset

```
curl -d @resources/create-asset.json \
  -H 'content-type: application/json' http://localhost:19193/management/v3/assets \
  -s | jq
```

#### 3. Create a policy

```
curl -d @resources/create-policy.json \
  -H 'content-type: application/json' http://localhost:19193/management/v2/policydefinitions \
  -s | jq
```

#### 4. Create a contract definition

```
curl -d @resources/create-contract-definition.json \
  -H 'content-type: application/json' http://localhost:19193/management/v2/contractdefinitions \
  -s | jq
```

#### 5. Fetch catalog

```
curl -X POST "http://localhost:29193/management/v2/catalog/request" \
    -H 'Content-Type: application/json' \
    -d @resources/fetch-catalog.json -s | jq
```

#### 6. Negotiate contract

Replace the `{{contract-offer-id}}` placeholder in `negotiate-contract.json` with the contract offer id you found in the catalog at the path `dcat:dataset.odrl:hasPolicy.@id`:

```
curl -d @resources/negotiate-contract.json \
  -X POST -H 'content-type: application/json' http://localhost:29193/management/v2/contractnegotiations \
  -s | jq
```

#### 7. Get contract agreement id

Replace `{{contract-negotiation-id}}` with the id from the consumer terminal:

```
curl -X GET "http://localhost:29193/management/v2/contractnegotiations/{{contract-negotiation-id}}" \
    --header 'Content-Type: application/json' \
    -s | jq
```

<br>
The connectors have now been configured successfully and are ready to be used.

[software_architecture]: https://github.com/amosproj/amos2024ss02-international-dataspace-station/blob/main/Deliverables/sprint-02/software-architecture.pdf
