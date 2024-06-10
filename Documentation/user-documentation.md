# Project Vision
With the increase of data exchange between organizations and other independent instances such as finance, legal, healthcare, government, etc the need of ease of data interoperability while still adhering to data usage, policies, and compliance to local legalizations is becoming significant. Dataspace is the envisioned solutions to tackle these challenges.

# Project Mission
Explore the feasibility of dataspace usage in regard to data sovereignty. This includes the testing the maturity of dataspace, which components are important and ease of deployment

# Usage
To execute the final program, ensure that all the requirements are installed (refer to the build-documentation.md) and that the Docker Daemon is running. Next run the command ``docker compose up`` in the **src** directory.

This will create three containers, each representing one connector (for the roles of *bank, company* and *tax advisor*) as well as an additional container representing the app.

## Login Page
In order to access the login page, enter ``localhost:3000``. This opens the login page, where the user can choose what role they want to log in as:

![](/Users/xmena/Documents/TU/AMOS/amos_project_2/amos2024ss02-international-dataspace-station/Documentation/user_documenation_images/login_page.png)

After choosing the desired role the user is forwarded to the login screen, where they have to enter the username and the password:

![](/Users/xmena/Documents/TU/AMOS/amos_project_2/amos2024ss02-international-dataspace-station/Documentation/user_documenation_images/login_page2.png)

## User Page
After a successful login the user will see their main page, where they can navigate, using the sidebar on the left side of the page, to different functionalities. 

In the top right corner the user has the possibility to log out and go back to the login page.

![](/Users/xmena/Documents/TU/AMOS/amos_project_2/amos2024ss02-international-dataspace-station/Documentation/user_documenation_images/connector_page.png)

### Home
The **Home** page consists of two buttons. The first one shows the status of the connector that belongs to the logged-in user.
The second one enables to create a connection between two connectors and do the contract definition and agreement.

![](/Users/xmena/Documents/TU/AMOS/amos_project_2/amos2024ss02-international-dataspace-station/Documentation/user_documenation_images/home.png)

### Send
The **Send** page offers the possibility to send the data to the chosen connector. The user can choose the connector they want to send the data to, they have the possibility of uploading the data, and finally, sending the file itself.

![](/Users/xmena/Documents/TU/AMOS/amos_project_2/amos2024ss02-international-dataspace-station/Documentation/user_documenation_images/send.png)

### Receive
The **Receive** page offers the possibility to view the previously exchanged files, as well as the possibility to download or delete them.

![](/Users/xmena/Documents/TU/AMOS/amos_project_2/amos2024ss02-international-dataspace-station/Documentation/user_documenation_images/receive.png)