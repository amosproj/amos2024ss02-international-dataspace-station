import * as net from 'net';

const PORT = 19191;

function checkPortStatus(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const client = net.createConnection({ port }, () => {
      client.end();
      resolve(true);
    });

    client.on('error', () => {
      resolve(false);
    });
  });
}

async function checkConnectorStatus(): Promise<string> {
  try {
    const isPortInUse = await checkPortStatus(PORT);
    if (isPortInUse) {
      console.log(`Connector is running on port ${PORT}`);
      return("Your connector is running!");
    } else {
      console.log(`Connector is not running on port ${PORT}`);
      return("Your connector is not running!");
    }
  } catch (error) {
    console.error('Error occurred while checking connector status:', error);
  }
}

export default function ConnectorStatus(){
    const response = checkConnectorStatus();
    return(
    response
    )
}