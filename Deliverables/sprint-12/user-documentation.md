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
![login_page1.png](user_documentation_images%2Flogin_page1.png)
![login_page2.png](user_documentation_images%2Flogin_page2.png)

## Home
In the **Home** page the user can see whether the connectors for the backend and database are running. There is also a button to refresh the statuses.
![home_page.png](user_documentation_images%2Fhome_page.png)

## Upload
The **Upload** page allows the user to upload new files into their personal database.
![upload_page1.png](user_documentation_images%2Fupload_page1.png)

They can do so by clicking the button *Upload file* in the upper right corner.
![upload_page2.png](user_documentation_images%2Fupload_page2.png)

## Download
The **Download** page allows the user the possibility to download the files from other connectors.
![download_page1.png](user_documentation_images%2Fdownload_page1.png)

In order to do so, the user has to choose the connector from whom they want to download the file and next, choose the desired file.
![download_page2.png](user_documentation_images%2Fdownload_page2.png)
***
