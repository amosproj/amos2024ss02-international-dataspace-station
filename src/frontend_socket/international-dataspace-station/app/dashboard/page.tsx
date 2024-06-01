"use client"
import { useState } from 'react';

export default function Page() {
  const [output, setOutput] = useState('');

  const handleClick = async () => {
    const response = await fetch('/api/execute_command');
    const data = await response.json();
    setOutput(data.output);
    console.log(data.output);  // Ausgabe in der Konsole anzeigen
  };


  return (
    <main className="flex min-h-screen flex-col p-6">
      <p>Dashboard Page</p>
      <button onClick={handleClick}>Execute Command</button>
      {output && <pre>{output}</pre>}  {/* Ausgabe auf der Seite anzeigen */}
    </main>
  );
}