import { FileInfo, Asset, CatalogItem, Policy } from "@/data/interface/file";

export async function uploadFile(form: FormData) {
  try {
    const response = await fetch(`/api/uploadFile`, {
        method: 'POST',
        body: form,
    });
    
    if (!response.ok) {
        throw new Error("HTTP Error! Status: ${response.status}");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error uploading file: ", err);
    throw new Error("Failed to upload file");
  }
}

export async function isConnectorRunning(connectorName: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/check_status?connector=${connectorName}`);

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.isRunning;
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
        throw error;
    }
}

export async function isDatabaseRunning(connectorName: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/check_db_status?connector=${connectorName}`);

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.isRunning;
    } catch (error) {
        console.error('Error occurred while checking database status:', error);
        throw error;
    }
}

  
export async function fetchCatalogItems(counterPartyName: string): Promise<CatalogItem[]> {
  try {
    const response = await fetch(`/api/fetchCatalog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ counterPartyName: counterPartyName }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.map((item: any) => ({
      date: item.date,
      name: item.name,
      author: item.author,
      title: item.title,
      id: item.id,
      contenttype: item.contenttype,
      size: item.size,
      contractIds: Array.isArray(item.contractIds) ? item.contractIds : [item.contractIds]
    }));
  } catch (error) {
    console.error('Error occurred while fetching catalog data:', error);
    throw error;
  }
}


export async function getPolicies(): Promise<Policy[]> {
  try {
    const response = await fetch('/api/getPolicies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error occurred while fetching policy data:', error);
    throw error;
  }
}


export async function getAssets(): Promise<Asset[]> {
  try {
    const response = await fetch('/api/getAssets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error('Error fetching assets: ', err);
    throw new Error('Failed to fetch assets');
  }
}

export async function createAsset(file: FileInfo): Promise<boolean> {
  try {
    const response = await fetch('/api/createAsset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: file.name,
        description: file.title,
        baseUrl: file.link,
        assetId: file.id,
        contenttype: file.contenttype,
        date: file.uploadDate,
        size: file.size
      })
    });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("created asset response: ", data);
    if (data.error) {
      throw new Error(data.error);
    }

    return true;
  } catch (err) {
    throw new Error("Error creating asset: ", err);
  }
}

export async function createContractDefinition(contractId: string, policyId: string, assetId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/createContractDefinition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: contractId,
        policyId: policyId,
        assetId: assetId
      })
    });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("response contract definition: ", data);
    if (data.error) {
      throw new Error(data.error);
    }

    return true;
  } catch (err) {
    throw new Error("Error creating contract definition: ", err);
  }
}



