var connectorBaseUrl: string;
var connectorManagementUrl: string;
var connectorControlUrl: string;
var connectorPublicUrl: string;
var connectorProtocolUrl: string;
var connectorApiUrl: string;

const queryRequestJson = {
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "odrl": "http://www.w3.org/ns/odrl/2/"
    },
    "@type": "QuerySpec",
    "filterExpression": []
};


if (process.env.RUNNING_ENV == "local" || process.env.RUNNING_ENV == undefined) {
    connectorBaseUrl = "http://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME;
    connectorManagementUrl = connectorBaseUrl + ":19193/management/";
    connectorControlUrl = connectorBaseUrl + ":19192/control/";
    connectorPublicUrl = connectorBaseUrl + ":19291/public/";
    connectorProtocolUrl = connectorBaseUrl + ":19194/protocol/";
    connectorApiUrl = connectorBaseUrl + ":19191/connector-api/";
} else {
    connectorBaseUrl = "https://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME + "." + process.env.CLOUD_DOMAIN;
    connectorManagementUrl = connectorBaseUrl + ":443/management/";
    connectorControlUrl = connectorBaseUrl + ":443/control/";
    connectorPublicUrl = connectorBaseUrl + ":443/public/";
    connectorProtocolUrl = connectorBaseUrl + ":443/protocol/";
    connectorApiUrl = connectorBaseUrl + ":443/connector-api/";
}

const authenticationPassword = process.env.NEXT_PUBLIC_CONNECTOR_NAME + "-pass";

function generateCreateAsset(description: string, contenttype: string, name: string, baseUrl: string, assetId: string, date: string, size: string) {
    const createAsset = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": assetId,
        "properties": {
            "name": name,
            "description": description,
            "contenttype": contenttype,
            "date": date,
            "size": size,
            "author": process.env.NEXT_PUBLIC_CONNECTOR_NAME || "Unknown Author"
        },
        "dataAddress": {
            "type": "HttpData",
            "name": name,
            "baseUrl": baseUrl,
            "proxyPath": "true",
            "header:X-API-Key": process.env.NEXT_PUBLIC_CONNECTOR_NAME + "-db-pass"
        }
    };
    return createAsset;
};

export async function createAsset(description: string, contenttype: string, name: string, baseUrl: string, assetId: string, date: string, size: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/assets", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(generateCreateAsset(description, contenttype, name, baseUrl, assetId, date, size))
        });
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        return await result.json();
    } catch (err) {
        console.error('Error creating asset:', err);
        throw new Error('Failed to create asset.');
    }
};



function generateFetchCatalog(counterPartyName: string | null) {
    var counterPartyAddress: string = "";
    if (!counterPartyName) {
        counterPartyAddress = "http://localhost:19194/protocol";
    } else if (process.env.RUNNING_ENV == "local") {
        counterPartyAddress = "http://" + counterPartyName + ":19194" + "/protocol";
    } else {
        counterPartyAddress = "https://" + counterPartyName + "." + process.env.CLOUD_DOMAIN + ":443/protocol";
    }
    const fetchCatalog = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "counterPartyAddress": counterPartyAddress,
        "protocol": "dataspace-protocol-http"
    };
    return fetchCatalog;
};

export async function fetchCatalog(counterPartyName: string | null) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/catalog/request", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(generateFetchCatalog(counterPartyName)),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error fetching catalog: ", err);
        throw new Error("Failed to fetch catalog");
    }
};


export async function getPolicies() {
    try {
        const result = await fetch(connectorManagementUrl + "v3/policydefinitions/request", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(queryRequestJson),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting policies: ", err);
        throw new Error("Failed to get policies");
    }
};

export async function getAssets() {
    try {
        const result = await fetch(connectorManagementUrl + "v3/assets/request", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(queryRequestJson),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting policies: ", err);
        throw new Error("Failed to get policies");
    }
}

export async function getContractDefinitions() {
    try {
        const result = await fetch(connectorManagementUrl + "v3/contractdefinitions/request", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(queryRequestJson),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting policies: ", err);
        throw new Error("Failed to get policies");
    }
};

export async function getNegotiatedContracts() {
    try {
        const result = await fetch(connectorManagementUrl + "v3/contractagreements/request", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(queryRequestJson),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting contractagreements: ", err);
        throw new Error("Failed to get contractagreements");
    }
};

function generateRegisterDataPlaneProvider(dataplaneId: string) {
    const registerDataPlaneProvider = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": dataplaneId,
        "url": connectorControlUrl + "transfer",
        "allowedSourceTypes": [
            "HttpData"
        ],
        "allowedDestTypes": [
            "HttpProxy",
            "HttpData"
        ],
        "properties": {
            "https://w3id.org/edc/v0.0.1/ns/publicApiUrl": connectorPublicUrl
        }
    };
    return registerDataPlaneProvider;
};

export async function registerDataplaneProvider(dataplaneId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v2/dataplanes", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(generateRegisterDataPlaneProvider(dataplaneId)),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error registering dataplane: ", err);
        throw new Error("Failed to register dataplane");
    }
};

function generateCreatePolicy(name: string, description: string, role: string) {
    var permission: any[] = [];
    if (role) {
        permission = [
            {
                "action": "use",
                "constraint": {
                    "@type": "AtomicConstraint",
                    "leftOperand": "role",
                    "operator": {
                        "@id": "odrl:eq"
                    },
                    "rightOperand": role
                }
            }
        ];
    }
    const createPolicy = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
            "odrl": "http://www.w3.org/ns/odrl/2/"
        },
        "privateProperties": {
            "name": name,
            "description": description
          },
        "policy": {
            "@context": "http://www.w3.org/ns/odrl.jsonld",
            "@type": "Set",
            "permission": permission,
            "prohibition": [],
            "obligation": []
        }
    };
    return createPolicy;
};

export async function createPolicy(name: string, description: string, role: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/policydefinitions", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(generateCreatePolicy(name, description, role)),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error creating policy: ", err);
        throw new Error("Failed to create policy");
    }
};

function generateCreateContractDefinition(contractId: string, policyId: string, assetId: string) {
    const createContractDefinition = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": contractId,
        "accessPolicyId": policyId,
        "contractPolicyId": policyId,
        "assetsSelector": [
            {
              "@type": "CriterionDto",
              "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
              "operator": "=",
              "operandRight": assetId
            }
          ]
    };
    return createContractDefinition;
};

export async function createContractDefinition(contractId: string, policyId: string, assetId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/contractdefinitions", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(generateCreateContractDefinition(contractId, policyId, assetId)),
        });
        if (!result.ok) {
            console.error(await result.json());
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error creating contract definition: ", err);
        throw new Error("Failed to create contract definition");
    }
};

function generateGetDataset(assetId: string, counterPartyName: string) {
    var counterPartyAddress: string = "";
    if (process.env.RUNNING_ENV == "local") {
        counterPartyAddress = "http://" + counterPartyName + ":19194" + "/protocol";
    } else {
        counterPartyAddress = "https://" + counterPartyName + "." + process.env.CLOUD_DOMAIN + ":443/protocol";
    }

    const getDataset = {
        "@context": {"@vocab": "https://w3id.org/edc/v0.0.1/ns/"},
        "@type": "DatasetRequest",
        "@id": assetId,
        "counterPartyAddress": counterPartyAddress,
        "protocol": "dataspace-protocol-http"
    };
    return getDataset;
};

export async function getDataset(assetId: string, counterPartyName: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/catalog/dataset/request", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(generateGetDataset(assetId, counterPartyName)),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting dataset: ", err);
        throw new Error("Failed to get dataset");
    }
}

function generateNegotiateContract(contractOfferId: string, assetId: string, counterPartyName: string, permission: any) {
    var counterPartyAddress: string = "";
    if (process.env.RUNNING_ENV == "local") {
        counterPartyAddress = "http://" + counterPartyName + ":19194" + "/protocol";
    } else {
        counterPartyAddress = "https://" + counterPartyName + "." + process.env.CLOUD_DOMAIN + ":443/protocol";
    }

    const negotiateContract = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@type": "ContractRequest",
        "counterPartyAddress": counterPartyAddress,
        "protocol": "dataspace-protocol-http",
        "policy": {
            "@context": "http://www.w3.org/ns/odrl.jsonld",
            "@id": contractOfferId,
            "@type": "Offer",
            "permission": permission,
            "assigner": counterPartyName,
            "target": assetId
        }
    };

    return negotiateContract;
};

export async function negotiateContract(contractOfferId: string, assetId: string, counterPartyName: string, permission: any) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/contractnegotiations", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(generateNegotiateContract(contractOfferId, assetId, counterPartyName, permission)),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error negotiating contract: ", err);
        throw new Error("Failed to negotiate contract");
    }
};

export async function getContractNegotiationStatus(negotiationId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/contractnegotiations/" + negotiationId, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            }
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting contract negotiation status: ", err);
        throw new Error("Failed to get contract negotiation status");
    }
}

function generateStartTransfer(contractId: string, assetId: string, counterPartyName: string) {
    var counterPartyAddress: string = "";
    if (process.env.RUNNING_ENV == "local") {
        counterPartyAddress = "http://" + counterPartyName + ":19194" + "/protocol";
    } else {
        counterPartyAddress = "https://" + counterPartyName + "." + process.env.CLOUD_DOMAIN + ":443/protocol";
    }

    const startTransfer = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@type": "TransferRequestDto",
        "connectorId": counterPartyName,
        "counterPartyAddress": counterPartyAddress,
        "contractId": contractId,
        "assetId": assetId,
        "protocol": "dataspace-protocol-http",
        "transferType": "HttpData-PULL"
    };
    return startTransfer;
};

export async function startTransfer(contractId: string, assetId: string, counterPartyName: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/transferprocesses", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify(generateStartTransfer(contractId, assetId, counterPartyName)),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error starting transfer: ", err);
        throw new Error("Failed to start transfer");
    }
}

export async function checkTransferStatus(transferId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v2/transferprocesses/" + transferId, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'X-API-Key': authenticationPassword
            }
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error checking transfer status: ", err);
        throw new Error("Failed to check transfer status");
    }
}

export async function getEndpointDataReference(transferId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/edrs/" + transferId + "/dataaddress", {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'X-API-Key': authenticationPassword
            }
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting endpoint data reference: ", err);
        throw new Error("Failed to get endpoint data reference");
    }
}

export async function getData(authorizationKey: string, counterPartyName: string) {
    var counterPartyAddress: string = "";
    if (process.env.RUNNING_ENV == "local") {
        counterPartyAddress = "http://" + counterPartyName + ":19291" + "/public";
    } else {
        counterPartyAddress = "https://" + counterPartyName + "." + process.env.CLOUD_DOMAIN + ":443/public";
    }

    try {
        const result = await fetch(counterPartyAddress, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Authorization': authorizationKey,
            },
        });
        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting data: ", err);
        throw new Error("Failed to get data");
    }
};

export async function deleteContractDefinition(contractId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/contractdefinitions/" + contractId, {
            method: 'DELETE',
            cache: 'no-cache',
            headers: {
                'X-API-Key': authenticationPassword
            }
        });

        if (!result.ok) {
            console.error(await result.text());
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.text();
        return data;
    } catch (err) {
        console.error("Error deleting contract definition: ", err);
        throw new Error("Failed to delete contract definition");
    }
}

export async function deleteAsset(assetId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/assets/" + assetId, {
            method: 'DELETE',
            cache: 'no-cache',
            headers: {
                'X-API-Key': authenticationPassword
            }
        });

        if (result.status === 409) {
            throw new Error("Asset could not be deleted because it's referenced by a contract agreement");
        }

        if (!result.ok) {
            console.error(await result.text());
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }
        const data = await result.text();
        return data;
    } catch (err) {
        console.error("Error deleting contract definition: ", err);
        throw new Error("Failed to delete contract definition");
    }
}

export async function getTransferredFile(authorizationKey: string, url: string) {
    try {
        const result = await fetch(url, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Authorization': authorizationKey,
            },
        });

        if (!result.ok) {
            throw new Error(`HTTP Error! Status: ${result.status}`);
        }

        const contentType = result.headers.get('content-type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await result.json();
        } else {
            const arrayBuffer = await result.arrayBuffer();
            data = Buffer.from(arrayBuffer);
        }

        return { data, contentType, contentDisposition: result.headers.get('content-disposition') };
    } catch (err) {
        console.error("Error getting data: ", err);
        throw new Error("Failed to get data");
    }
}