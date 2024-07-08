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
    connectorApiUrl = connectorBaseUrl + ":19191/api/";
} else {
    connectorBaseUrl = "https://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME + "." + process.env.CLOUD_DOMAIN;
    connectorManagementUrl = connectorBaseUrl + ":443/management/";
    connectorControlUrl = connectorBaseUrl + ":443/control/";
    connectorPublicUrl = connectorBaseUrl + ":443/public/";
    connectorProtocolUrl = connectorBaseUrl + ":443/protocol/";
    connectorApiUrl = connectorBaseUrl + ":443/api/";
}

function generateCreateAsset(description: string, contenttype: string, name: string, baseUrl: string, assetId: string) {
    const createAsset = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": assetId,
        "properties": {
            "name": description,
            "contenttype": contenttype
        },
        "dataAddress": {
            "type": "HttpData",
            "name": name,
            "baseUrl": baseUrl,
            "proxyPath": "true"
        }
    };
    return createAsset;
};

export async function createAsset(description: string, contenttype: string, name: string, baseUrl: string, assetId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v3/assets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(generateCreateAsset(description, contenttype, name, baseUrl, assetId))
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



function generateFetchCatalog(counterPartyName: string) {
    var counterPartyAddress: string = "";
    if (process.env.RUNNING_ENV == "local") {
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

export async function fetchCatalog(counterPartyName: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v2/catalog/request", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateFetchCatalog(counterPartyName)),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
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
        const result = await fetch(connectorManagementUrl + "v2/policydefinitions/request", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryRequestJson),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryRequestJson),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting policies: ", err);
        throw new Error("Failed to get policies");
    }
}

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
    }
};

export async function registerDataplaneProvider(dataplaneId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v2/dataplanes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateRegisterDataPlaneProvider(dataplaneId)),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error registering dataplane: ", err);
        throw new Error("Failed to register dataplane");
    }
};

function generateCreatePolicy(policyId: string) {
    // TODO: acutal policy with permission/prohibition/obligation
    const createPolicy = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
            "odrl": "http://www.w3.org/ns/odrl/2/"
        },
        "@id": policyId,
        "policy": {
            "@context": "http://www.w3.org/ns/odrl.jsonld",
            "@type": "Set",
            "permission": [],
            "prohibition": [],
            "obligation": []
        }
    };
    return createPolicy;
};

export async function createPolicy(policyId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v2/policydefinitions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateCreatePolicy(policyId)),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error creating policy: ", err);
        throw new Error("Failed to create policy");
    }
};

function generateCreateContractDefinition(contractId: string, policyId: string) {
    const createContractDefinition = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": contractId,
        "accessPolicyId": policyId,
        "contractPolicyId": policyId,
        "assetsSelector": []
    };
};

export async function createContractDefinition(contractId: string, policyId: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v2/contractdefinitions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateCreateContractDefinition(contractId, policyId)),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
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
        const result = await fetch(connectorManagementUrl + "v2/catalog/dataset/request", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateGetDataset(assetId, counterPartyName)),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting dataset: ", err);
        throw new Error("Failed to get dataset");
    }
}

function generateNegotiateContract(contractOfferId: string, assetId: string, counterPartyName: string) {
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
            "assigner": "provider",
            "target": assetId
        }
    };
};

export async function negotiateContract(contractOfferId: string, assetId: string, counterPartyName: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v2/contractnegotiations", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateNegotiateContract(contractOfferId, assetId, counterPartyName)),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error negotiating contract: ", err);
        throw new Error("Failed to negotiate contract");
    }
};

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
        "dataDestination": {
            "type": "HttpProxy"
        }
    };
};

export async function startTransfer(contractId: string, assetId: string, counterPartyName: string) {
    try {
        const result = await fetch(connectorManagementUrl + "v2/transferprocesses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateStartTransfer(contractId, assetId, counterPartyName)),
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
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
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
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
        const result = await fetch(connectorManagementUrl + "v1/edrs/" + transferId + "/dataaddress", {
            method: 'GET',
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
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
            headers: {
                'Authorization': authorizationKey,
            },
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error getting data: ", err);
        throw new Error("Failed to get data");
    }
};