import ConnectorStatus from "./connector_status";

export default function Page() {

    return (
        <main className="flex min-h-screen flex-col p-6">
            <p>Dashboard Page</p>
            <ConnectorStatus port={29191}/>
            <ConnectorStatus port={19191}/>
            {/*<ConnectorStatus/>*/}
        </main>
    );
}