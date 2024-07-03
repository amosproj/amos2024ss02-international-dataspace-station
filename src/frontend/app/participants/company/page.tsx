import Link from 'next/link';
import Image from 'next/image';

const conList: ContainerProps[] = [
  { href: '/login', title: 'Company', description: 'This is a company login page' },
];

interface ContainerProps{
  href: string;
  title: string;
  description: string;
}

const  Container = (props: ContainerProps) => {
  return(
      <Link href={props.href} legacyBehavior className="py-5">
        <a className="w-full">
          <div
              className=" hover:bg-neonBlue shadow-xl flex flex-col items-center justify-center p-4 rounded-xl bg-neonGreen transition"
              // className="text-white bg-gradient-to-br from-neonBlue to-neonGreen hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"

          >
            <h2 className="text-2xl font-bold text-neon">{props.title}</h2>
            <p className="text-gray-700">{props.description}</p>
          </div>
        </a>
      </Link>
  )
}

export default function Page() {
  return (
      <main className="flex min-h-screen flex-col p-6 bg-black">
        <div className="m-8 flex grow flex-col gap-4 md:flex-row ">
            <div className="m-8 flex flex-col justify-center rounded-lg px-3 py-5 md:w-2/5 md:px-20
             bg-neonBlue shadow-xl shadow-neonGreen">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
              <div>
              <p className="text-2xl  md:text-4xl md:leading-normal">
                Welcome to <br/><strong>International Dataspace Station Dashboard</strong>
              </p>
              </div>
            </div>
          <div className="flex flex-col items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 gap-10">
              {conList.map((c) => {
                return (
                    <Container key={c.href} href={c.href} title={c.title} description={c.description}/>
                );
              })}
          </div>
        </div>
      </main>
  );
}
