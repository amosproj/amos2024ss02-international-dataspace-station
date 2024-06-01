import ConnectorStatus from '@/app/dashboard/bank/bank_status';

export default function Page() {
  return(
  <main className="flex min-h-screen flex-col p-6">
  <p>Bank Page</p>
  <br></br>
  <ConnectorStatus/>
  </main>
  );
}