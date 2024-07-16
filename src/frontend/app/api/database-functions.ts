var databaseUrl: string;


if (process.env.RUNNING_ENV == "local" || process.env.RUNNING_ENV == undefined) {
    databaseUrl = "http://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME + "-database:8080";
} else {
    databaseUrl = "https://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME + "." + process.env.CLOUD_DOMAIN + ":443/database";
}

const authenticationPassword = process.env.NEXT_PUBLIC_CONNECTOR_NAME + "-db-pass";

export async function uploadFile(file: FormDataEntryValue) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await fetch(databaseUrl + "/files/upload", {
            method: 'POST',
            body: formData,
            headers: {
                'X-API-Key': authenticationPassword
            }
        });
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        const id = await result.text();
        console.log("FILE UPLOADED! ", id);
        return {
            id: id,
            url: databaseUrl + "/files/get/" + id
        };
    } catch (err) {
        console.error("Error uploading file: ", err);
        throw new Error("Failed to upload file");
    }
}

export async function downloadFile(fileId: string) {
    const response = await fetch(databaseUrl + "/files/get/" + fileId, {
        method: 'GET',
        headers: {
            'X-API-Key': authenticationPassword
        }
    });

    if (!response.ok) {
        throw new Error("Couldn't fetch file from database: STATUS " + response.status + " MESSAGE " + await response.text());
    }

    return response;
}

export async function deleteFile(fileId: string) {
    try {
        const result = await fetch(databaseUrl + "/files/delete/" + fileId, {
            method: 'GET',
            headers: {
                'X-API-Key': authenticationPassword
            }
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
        }
        return true;
    } catch (err) {
        console.error("Error uploading file: ", err);
        throw new Error("Failed to upload file");
    }
}

export async function uploadContractAgreementInfo(agreementId: string, fileName: string, fileSize: string, title: string, date: string, author: string, contenttype: string) {
    try {
        const response = await fetch(databaseUrl + "/contracts/store", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            },
            body: JSON.stringify({
                id: agreementId,
                fileName: fileName,
                fileSize: fileSize,
                title: title,
                date: date,
                author: author,
                contenttype: contenttype
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return;
    } catch (err) {
        console.error("Error uploading contract agreement info: ", err);
        throw new Error("Failed to upload contract agreement info");
    }
}

export async function getContractAgreementInfo(agreementId: string) {
    try {
        const response = await fetch(databaseUrl + "/contracts/get/" + agreementId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': authenticationPassword
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contractAgreement = await response.json();
        return contractAgreement;
    } catch (err) {
        console.error('Failed to get contract agreement info:', err);
        throw new Error("Failed to get contract agreement info");
    }
}
