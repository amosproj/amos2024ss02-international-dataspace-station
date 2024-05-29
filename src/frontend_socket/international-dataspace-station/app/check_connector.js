import express from 'express';
import http from 'http';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import net from 'net';

const require = createRequire(import.meta.url);
const socketIo = require('socket.io');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const checkPortOpen = (port, host = '127.0.0.1', timeout = 2000) => {
  return new Promise((resolve) => {
    const client = new net.Socket();

    client.setTimeout(timeout);

    client.once('connect', () => {
      client.destroy();
      resolve(true);
    });

    client.once('timeout', () => {
      client.destroy();
      resolve(false);
    });

    client.once('error', () => {
      resolve(false);
    });

    client.connect(port, host);
  });
};

const ports = {
  consumer: 19191,
  provider: 29191
};

// Serve a simple HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to check port statuses
app.get('/check-ports', async (req, res) => {
  const statusPromises = Object.entries(ports).map(async ([key, port]) => {
    const isOpen = await checkPortOpen(port);
    return { port, isOpen };
  });

  const statuses = await Promise.all(statusPromises);
  res.json(statuses);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
