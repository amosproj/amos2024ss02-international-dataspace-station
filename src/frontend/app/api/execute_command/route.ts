import { NextResponse } from 'next/server';
import { execSync, spawnSync } from 'child_process';
import fs from 'fs';


const executeCommand = (command: string) => {
  try {
    const output = execSync(command, { encoding: 'utf-8'}); // , cwd: "../../"
    console.log(output)
    return { command, output: JSON.parse(output) };
    
  } catch (error) {
    console.error();
    return { command, error: (error as Error).message };
  }
};


const replacePlaceholderInFile = (filePath: string, placeholder: string, replacement: string) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updatedContent = content.replace(placeholder, replacement);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
};

export async function GET() {
  try {

    /******* To test the button locally, use the commented lines below *******/

    // const commands = [
    //   "curl -H 'Content-Type: application/json' -d @../../resources/dataplane/register-data-plane-provider.json -X POST 'http://localhost:19193/management/v2/dataplanes' -s | jq",
    //   "curl -d @../../resources/create-asset.json -H 'content-type: application/json' http://localhost:19193/management/v3/assets -s | jq",
    //   "curl -d @../../resources/create-policy.json -H 'content-type: application/json' http://localhost:19193/management/v2/policydefinitions -s | jq",
    //   "curl -d @../../resources/create-contract-definition.json -H 'content-type: application/json' http://localhost:19193/management/v2/contractdefinitions -s | jq",
    //   "curl -X POST 'http://localhost:19193/management/v2/catalog/request' -H 'Content-Type: application/json' -d @../../resources/fetch-catalog.json -s | jq"
    // ];

    const commands = [
      "curl -H 'Content-Type: application/json' -d @resources/dataplane/register-data-plane-provider.json -X POST 'http://company_connector:19193/management/v2/dataplanes' -s | jq",
      "curl -d @resources/create-asset.json -H 'content-type: application/json' http://company_connector:19193/management/v3/assets -s | jq",
      "curl -d @resources/create-policy.json -H 'content-type: application/json' http://company_connector:19193/management/v2/policydefinitions -s | jq",
      "curl -d @resources/create-contract-definition.json -H 'content-type: application/json' http://company_connector:19193/management/v2/contractdefinitions -s | jq",
      "curl -X POST 'http://company_connector:19193/management/v2/catalog/request' -H 'Content-Type: application/json' -d @resources/fetch-catalog.json -s | jq"
    ];

    
    const results = commands.map(executeCommand); // Execute and save the results of the commands

    const catalogResult = results[4].output;
    const contractOfferId = catalogResult["dcat:dataset"]["odrl:hasPolicy"]["@id"]; // Save contract offer id from the response

    //const negotiateContractPath = '../../resources/negotiate-contract.json';
    const negotiateContractPath = 'resources/negotiate-contract.json';
    const negotiateContract = fs.readFileSync(negotiateContractPath, { encoding: 'utf8'}); // Read negotiate-contract.json and save as string
    const negotiateContractJSON = JSON.parse(negotiateContract) // Convert string to json object
    const contractId = negotiateContractJSON["policy"]["@id"]; // Get old contract offer id
    replacePlaceholderInFile(negotiateContractPath, contractId, contractOfferId); // Replace old id with the new one

    // const finalCommand = "curl -d @../../resources/negotiate-contract.json -X POST -H 'content-type: application/json' http://localhost:19193/management/v2/contractnegotiations -s | jq";
    const finalCommand = "curl -d @resources/negotiate-contract.json -X POST -H 'content-type: application/json' http://company_connector:19193/management/v2/contractnegotiations -s | jq";
    const finalResult = executeCommand(finalCommand);
   
    results.push(finalResult);
    

    const contractNegotiationId = results[5].output["@id"]; // Get contract negotiation id from the response
    // const lastCommand = `curl -X GET "http://localhost:19193/management/v2/contractnegotiations/${contractNegotiationId}" --header 'Content-Type: application/json' -s | jq`;
    const lastCommand = `curl -X GET "http://company_connector:19193/management/v2/contractnegotiations/${contractNegotiationId}" --header 'Content-Type: application/json' -s | jq`;
    const lastResult = executeCommand(lastCommand);

    results.push(lastResult);

    return NextResponse.json({ results });

  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}