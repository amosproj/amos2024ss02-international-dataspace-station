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
    return data.id;
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

interface CatalogItem {
  date: string;
  name: string;
  author: string;
  id: string;
  contenttype: string;
  size: string;
  contractIds: string[];
}
  
export async function fetchCatalogItems(counterPartyName: string): Promise<CatalogItem[]> {
  try {
    const response = await fetch(`/api/fetchCatalog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ counterPartyName }),
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

interface Policy {
  name: string;
  description: string;
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

interface Asset {
  date: string;
  name: string;
  author: string;
  id: string;
  contenttype: string;
  size: string;
  baseUrl: string;
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



