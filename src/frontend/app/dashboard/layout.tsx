import SideNav from '@/app/dashboard/sidenav';
import {cookies} from "next/headers";
import {User} from "@/data/interface/user";
import Cookies from 'js-cookie';
import {redirect} from "next/navigation";
import Link from "next/link";
import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/solid";

export default function Layout({children}: { children: React.ReactNode }) {
    const userCookie = cookies().get('user' as any)?.value;
    let user: User | null = null;

    if (userCookie) {
        try {
            user = JSON.parse(userCookie) as User;
        } catch (error) {
            console.error('Failed to parse user cookie:', error);
        }
    }

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full md:w-64 flex-none">
                <SideNav/>
            </div>
            <div className="flex-grow md:flex flex-col">
                <div className="flex flex-row justify-between p-6 bg-neonGreen text-black">
                    {user &&
                    <>
                        <div className="flex items-center">{user?.role?.toUpperCase()}</div>
                        <div className="flex flex-row gap-4">
                            <div
                                // className="hover:bg-neonBlue rounded-xl bg-gray-50"
                                className="flex h-[48px] grow items-center text-black justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-neonBlue focus:bg-neonBlue shadow-xl md:flex-none md:justify-start md:p-2 md:px-3"
                                >
                                Hi, <strong>{user?.username}</strong>!
                            </div>
                            <Link href={'/'}
                                  className="flex h-[48px] grow items-center text-black justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-neonBlue focus:bg-neonBlue shadow-xl md:flex-none md:justify-start md:p-2 md:px-3"
                            >
                                <ArrowRightEndOnRectangleIcon className="w-6"/>
                            </Link>
                        </div>
                    </>
                    }
                </div>
                <div className="flex-grow p-6 bg-white md:overflow-y-auto md:p-12">
                    {children}
                </div>
            </div>
        </div>
    );
}