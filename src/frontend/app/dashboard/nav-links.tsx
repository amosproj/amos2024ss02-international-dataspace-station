'use client';

import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  PaperAirplaneIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Upload',
    href: '/dashboard/upload',
    icon: ArrowUpTrayIcon,
  },
  {
    name: 'Download',
    href: '/dashboard/download',
    icon: ArrowDownTrayIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center text-black justify-center gap-2 rounded-md p-3 text-sm font-medium shadow-xl md:flex-none md:justify-start md:p-2 md:px-3 ${isActive ? 'bg-neonBlue text-white' : 'bg-white hover:bg-neonBlue focus:bg-neonBlue'}`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}