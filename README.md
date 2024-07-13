<p align="center"> <img src="https://raw.githubusercontent.com/amosproj/amos2024ss02-international-dataspace-station/main/Deliverables/sprint-01/team-logo-without-edges.png" alt="IDS" style="width:250px;height:250px;"> </p>

<h1 align="center"> International Dataspace Station </h1> 
<h3 align="center"> in collaboration with DATEV </h3>

<br>

## 📖 About

With the increase of data exchange among different sectors like finance, legal, healthcare, government and others, ensuring easy interoperability while still following data usage rules, policies, and local regulations is becoming increasingly important. **Dataspace** is the envisioned solution to tackle these challenges.

Dataspace operates with the help of **data connectors**, which enable secure and effective communication and exchange of data. They are a tool to connect many data endpoints to increase the pool of available data and to accelerate the data economy. By linking data connectors, dataspaces become protected environments where participants can freely share data. Data sovereignty, transparency and fairness are ensured by adherence to a set of rules.

Our goal is to explore the feasibiltiy of dataspace usage with regards to data sovereignty. This includes testing the maturity of dataspace, importance of the components and ease of deployment.

Learn in more detail about how our software works here: [IDS - Documentation][documentation] 

<br>

## ⚡️ Requirements

To run the connectors on your own machine, installing Docker is enough. You don't need to install any additional packages or dependencies.

[![Docker](https://img.shields.io/badge/Docker-v27-blue.svg)](https://docs.docker.com/get-docker/)

<br>

## 🐳 Docker usage

To run the code using docker, use the following commands in the `src` folder:

```
sudo docker compose --profile complete build
sudo docker compose --profile <company|taxadvisor|bank> up
```

To start only selected profiles, use:

```
sudo docker compose --profile complete up
```

<br>

<span style="color:red"><b> Note: </b></span> If you are using macOS, you might have to modify the `config.json` file:
1. Go to `~/.docker/config.json`.
2. Change the `credsStore` value from `desktop` to `osxkeychain`.

Alternatively you may:
1. Go to `sudo vi  ~/.docker/config.json`.
2. Change `credsStore` to `credStore`.

<br>

## 🖥️ Running connectors locally

<b> ❗️ You don't have to do this to use our application or for further app development ❗️ </b>

But if you still want to run and test the connectors without using Docker, please refer to the [build documentation][build-documentation].

<br>

## 🧑‍💻 IDS Team

[![Contributors](https://contrib.rocks/image?repo=amosproj/amos2024ss02-international-dataspace-station)](https://github.com/amosproj/amos2024ss02-international-dataspace-station/graphs/contributors)

[documentation]: https://github.com/amosproj/amos2024ss02-international-dataspace-station/tree/main/Documentation

[build-documentation]: https://github.com/amosproj/amos2024ss02-international-dataspace-station/blob/main/Documentation/build-documentation.md