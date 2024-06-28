import NavLinks from '@/app/dashboard/nav-links';
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-black">
      <div className="flex grow flex-row justify-start space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="flex justify-start items-center pb-8 space-x-5">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <p className="text-sm text-neonGreen md:text-md md:leading-normal">
                  International Dataspace Station Dashboard
              </p>
          </div>
          <NavLinks />
      </div>
    </div>
  );
}