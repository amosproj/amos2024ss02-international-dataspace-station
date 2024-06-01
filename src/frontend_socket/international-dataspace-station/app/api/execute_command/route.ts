import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';

// Funktion zum Ausführen eines Shell-Befehls und Rückgabe der Ausgabe
const executeCommand = (command: string) => {
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    return { command, output: JSON.parse(output) };
  } catch (error) {
    return { command, error: (error as Error).message };
  }
};

// Funktion zum Ersetzen des Platzhalters in der JSON-Datei
const replacePlaceholderInFile = (filePath: string, placeholder: string, replacement: string) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updatedContent = content.replace(placeholder, replacement);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
};

export async function GET() {
  try {
    // Liste der initialen Befehle
    const commands = [
      "curl -H 'Content-Type: application/json' -d @resources/dataplane/register-data-plane-provider.json -X POST 'http://localhost:19193/management/v2/dataplanes' -s | jq",
      "curl -d @resources/create-asset.json -H 'content-type: application/json' http://localhost:19193/management/v3/assets -s | jq",
      "curl -d @resources/create-policy.json -H 'content-type: application/json' http://localhost:19193/management/v2/policydefinitions -s | jq",
      "curl -d @resources/create-contract-definition.json -H 'content-type: application/json' http://localhost:19193/management/v2/contractdefinitions -s | jq",
      "curl -X POST 'http://localhost:29193/management/v2/catalog/request' -H 'Content-Type: application/json' -d @resources/fetch-catalog.json -s | jq"
    ];

    // Ergebnisse der Befehle ausführen und speichern
    const results = commands.map(executeCommand);

    // Extrahiere die Vertrags-ID aus dem Katalogergebnis
    const catalogResult = results[4].output;
    const contractOfferId = catalogResult["dcat:dataset"]["odrl:hasPolicy"]["@id"];

    // Ersetze den Platzhalter in negotiate-contract.json
    const negotiateContractPath = './resources/negotiate-contract.json';
    replacePlaceholderInFile(negotiateContractPath, '{{contract-offer-id}}', contractOfferId);

    // Definiere und führe den finalen Befehl aus
    const finalCommand = "curl -d @resources/negotiate-contract.json -X POST -H 'content-type: application/json' http://localhost:29193/management/v2/contractnegotiations -s | jq";
    const finalResult = executeCommand(finalCommand);

    // Füge das Ergebnis des finalen Befehls hinzu
    results.push(finalResult);

    // Extrahiere die Vertragsverhandlungs-ID aus dem finalen Ergebnis
    const contractNegotiationId = finalResult.output.id;

    // Führe das letzte Kommando aus
    const lastCommand = `curl -X GET "http://localhost:29193/management/v2/contractnegotiations/${contractNegotiationId}" --header 'Content-Type: application/json' -s | jq`;
    const lastResult = executeCommand(lastCommand);

    // Füge das Ergebnis des letzten Befehls hinzu
    results.push(lastResult);

    return NextResponse.json({ results });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
