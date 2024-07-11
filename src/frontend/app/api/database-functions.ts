var databaseUrl: string;


if (process.env.RUNNING_ENV == "local" || process.env.RUNNING_ENV == undefined) {
    databaseUrl = "http://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME + "-database:8080";
} else {
    databaseUrl = "https://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME + "." + process.env.CLOUD_DOMAIN + ":443/database";
}


export async function uploadFile(file: FormDataEntryValue) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await fetch(databaseUrl + "/files/upload", {
            method: 'POST',
            body: formData,
        });
        if (!result.ok) {
            throw new Error("HTTP Error! Status: ${result.status}");
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