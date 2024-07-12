import SideNav from '@/app/dashboard/sidenav';
import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/solid";
import { auth, signOut } from '@/auth';

export default async function Layout({children}: { children: React.ReactNode }) {
    const session = await auth()

    if (!session?.user) return null

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full md:w-64 flex-none">
                <SideNav/>
            </div>
            <div className="flex-grow md:flex flex-col">
                <div className="flex flex-row justify-between p-6 bg-neonGreen text-black">
                    <div className="flex items-center">{process.env.NEXT_PUBLIC_CONNECTOR_NAME?.toUpperCase() || "NO ROLE"}</div>
                    <div className="flex flex-row gap-4">
                        <div
                            // className="hover:bg-neonBlue rounded-xl bg-gray-50"
                            className="flex h-[48px] grow items-center text-black justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-neonBlue focus:bg-neonBlue shadow-xl md:flex-none md:justify-start md:p-2 md:px-3"
                            >
                            Hi, <strong>{session.user.name}!</strong>
                            <img src={session.user.image} alt="profile-picture" className="h-8 w-8 rounded-full"/>
                        </div>
                        <form
                            action={async (formData) => {
                                "use server"
                                await signOut({ redirectTo: '/', redirect:true })
                            }}
                        >
                            <button
                                className="flex h-[48px] grow items-center text-black justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-neonBlue focus:bg-neonBlue shadow-xl md:flex-none md:justify-start md:p-2 md:px-3"
                            >
                                <ArrowRightEndOnRectangleIcon className="w-6"/>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex-grow p-6 bg-white md:overflow-y-auto md:p-12">
                    {children}
                </div>
            </div>
        </div>
    );
}