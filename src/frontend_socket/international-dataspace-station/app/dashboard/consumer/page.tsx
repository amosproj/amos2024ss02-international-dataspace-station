import ConnectorStatus from '@/app/dashboard/consumer/consumer_status';

export default function Page() {
  return(
  <main className="flex min-h-screen flex-col p-6">
  <p>Consumer Page</p>
  <br></br>
  <ConnectorStatus/>
  </main>
  );
}