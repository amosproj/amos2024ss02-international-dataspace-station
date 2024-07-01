# Storage possibilities for file/message transfer

## EDC implementation

On the [main EDC page](https://github.com/eclipse-edc) on GitHub there is an implementation of the [Minimum Viable Dataspace](https://github.com/eclipse-edc/MinimumViableDataspace?tab=readme-ov-file). Just like our app, it has 3 companies (3 roles) that are able to send files ot each other and already has file transfer implemented. It uses [Azurite](https://github.com/Azure/Azurite) to store files during transfer, which is an open source Azure Storage API compatible server (emulator).

### Standard scenario (taken from the MVD repository):

(Prerequisite: create a test document manually)

- Connect to the local blob storage account (provided by Azurite) of `company1`. Microsoft Azure Storage Explorer can be used to connect to the local storage account.

- Create a container named `src-container`.

- Copy `deployment/azure/terraform/modules/participant/sample-data/text-document.txt` into the newly created container. Note: It does not have to be this exact file as long you create a file which has the name `text-document.txt`.

- Open the website of `company1` and verify the existence of two assets in the section `Assets`.

- Open the website of the `company2` and verify six existing assets from all participants in the `Catalog Browser`. In the `Catalog Browser` click `Negotiate` for the asset `test-document_company1`. There should be a message "Contract Negotiation complete! Show me!" in less than a minute.

- From the previous message click `Show me!`. If you missed it, switch manually to the section `Contracts`.
There should be a new contract. Click `Transfer` to initiate the transfer process. A dialog should open. Here, select as destination `AzureStorage` and click `Start transfer`. There should be a message "Transfer [id] complete! Show me!" in less than a minute. (Where id is a UUID.)

- To verify the successful transfer the Storage Explorer can be used to look into the storage account of `company2`. There should be new container in the storage account containing two files `.complete` and `text-document.txt`.

## Other options

Considering that DATEV's cloud environment is AWS and not Azure, it makes more sense to use another type of storage, but with a similar implementation. Here are some databases that can be implemented with React that we can consider using:

1. **PostgreSQL**: Suggested by DATEV. Here is how to set it up for a React application: [Getting started with Postgres in your React app](https://blog.logrocket.com/getting-started-postgres-react-app/)

2. **SQLite**: A lightweight database that is easy to set up and use with React Native, suitable for offline storage needs.

3. **Vasern**: A lightweight, open-source database that provides fast operations and end-to-end encryption. It's designed for local storage, syncing, and cloud storage.

4. **Async Storage**: Built into React Native, this system allows for local data storage and persistence across application reboots.