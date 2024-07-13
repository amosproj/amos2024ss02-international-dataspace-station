# Project Vision
With the increase of data exchange between organizations and other independent instances such as finance, legal, healthcare, government, etc the need of ease of data interoperability while still adhering to data usage, policies, and compliance to local legalizations is becoming significant. Dataspace is the envisioned solutions to tackle these challenges.

# Project Mission
Explore the feasibility of dataspace usage in regard to data sovereignty. This includes the testing the maturity of dataspace, which components are important and ease of deployment.

# Usage
To execute the final program, ensure that all the requirements are installed (refer to the build-documenation.pdf) and that the Docker Daemon is running. 

Next you can run `docker compose up` (or `docker compose up --build` if you are running it for the first time) in the *src* folder, if you want to run all the elements. You can also run only the chosen elements. There are three roles to choose from: 
 - company (written as *company*)
 - tax advisor (written as *tax_advisor*)
 - bank (written as *bank*)

Each of the role has three different docker containers that should be running in order to ensure full functionality. In order to run each of the elements separately, the following command should be run in the *src* folder `docker compose up <container_name>`. There are three container names that should be running:
 - <company/tax_advisor/bank>
 - <company/tax_advisor/bank>-frontend
 - <company/tax_advisor/bank>-database

After ensuring that all the steps have been executed successfully, the functionality can be accessed either locally or via the cloud (*see the section below*).

## *Local* Usage
In order to access the functionality locally, enter the one of the following addresses into the browser:
 - `localhost:3001` for company 
 - `localhost:3002` for tax advisor
 - `localhost:3003` for bank

In each case user will be automatically redirected to the `localhost:3000` and from there the login page for the respective role can be accessed.

## *Cloud* Usage
In order to acces the functionality via cloud, enter the following addresses into the browser:
 - `https://company.amos.cloudness.dev/` for company
 - `https://tax_advisor.amos.cloudness.dev/` for tax advisor
 - `https://bank.amos.cloudness.dev/` for bank

In each case the user will be automatically redirected to the login page of the respective role.

## Login Page
The login page redirects the user to the next page where they can enter the username and the password required to log in.

### Home
The **Home** page consists of two buttons. The first one shows the status of the connector that belongs to the logged-in user.
The second one enables to create a connection between two connectors and do the contract definition and agreement.

### Send
The **Send** page offers the possibility to send the data to the chosen connector. The user can choose the connector they want to send the data to, they have the possibility of uploading the data, and finally, sending the file itself.

### Receive
The **Receive** page offers the possibility to view the previously exchanged files, as well as the possibility to download or delete them.
***
