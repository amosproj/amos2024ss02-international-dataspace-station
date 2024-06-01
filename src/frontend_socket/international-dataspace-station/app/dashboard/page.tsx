import {cookies} from "next/headers";

export default function Page() {
  const role = cookies().get('role' as any).value;

  return(
  <main className="flex min-h-screen flex-col p-6">
  <p>Dashboard Page</p>
    <p>{role}</p>
  </main>
  );
}