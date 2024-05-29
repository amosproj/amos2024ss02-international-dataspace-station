import ConnectorStatus from '@/app/dashboard/provider/connector_status';

export default function Page() {
  return(
  <main className="flex min-h-screen flex-col p-6">
  <p>Provider Page</p>
  <ConnectorStatus />
  </main>
  );
}