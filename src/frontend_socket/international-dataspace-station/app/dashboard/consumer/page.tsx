import ConnectorStatus from '@/app/dashboard/consumer/connector_status';

export default function Page() {
  return(
  <main className="flex min-h-screen flex-col p-6">
  <p>Consumer Page</p>
  <ConnectorStatus />
  </main>
  );
}