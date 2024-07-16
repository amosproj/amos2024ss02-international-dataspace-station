# Adding a new profile to the application

As of now, our application contains three profiles (roles): company, tax advisor and bank. Let's say you want to add a new profile (for example, government agency) to the picture. The following components need to be implemented:

## 1. Additional connector

* Add a new dockerfile to `src/edc-connector` (for example, `government_connector.Dockerfile`)
* Add a new configuration file to `src/edc-connector/resources/configuration`

## 2. Additional database space

* Add a new dockerfile to `src/databse` (for example, `government_database.Dockerfile`)

## 3. Dedicated frontend 

* Add a new dockerfile to `src/frontend` (for example, `government_frontend.Dockerfile`)
* Add a new participant to the web application to `src/frontend/data/participants.json` and a new user to `src/frontend/data/users.json`
* Adjust API functions and web interface where necessary

<br>

<b>The Docker Compose file `docker-compose.yml` needs to be adjusted accordingly.</b> Each of the connectors and frontend pages has their own dedicated ports, so you have to assign different ones to a new profile (for example, bank's connector is using ports `39191-39291` and bank's frontend runs on port `3003`). When adding new functions to certain profiles you need to make sure to use the right ports and environment variables.

