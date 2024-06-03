"use client"
import { useState } from 'react';
import './styles/style.css';

export default function Page() {
  const [output, setOutput] = useState('');
  const [connectionMessage, setConnectionMessage] = useState('');

  const handleClick = async () => {
    const response = await fetch('/api/execute_command');
    const data = await response.json();
    setOutput(data.output);
    console.log(data.output);  // Ausgabe in der Konsole anzeigen
    // Check if the last command was successful
    if (data.results && data.results.length > 0) {
      const lastCommandResult = data.results[data.results.length - 1];
      if (lastCommandResult.output) {
        setConnectionMessage('The connection has been established.');
      } else {
        setConnectionMessage('Failed to establish the connection.');
      }
    }
  };


  return (
    <main className="flex min-h-screen flex-col p-6">
      <p>Dashboard Page</p>
      <button onClick={handleClick} className="custom-button">Execute Command</button>
      {output && <pre>{output}</pre>}  {/* Ausgabe auf der Seite anzeigen */}
      {connectionMessage && <p>{connectionMessage}</p>}  {/* Verbindungsstatus anzeigen */}
    </main>
  );
}
