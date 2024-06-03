import SideNav from '@/app/dashboard/sidenav';
import {cookies} from "next/headers";
import {User} from "@/data/interface/user";

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
                                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                Hi, <strong>{user?.username}</strong>!
                            </div>
                            {/*<button onClick={() => {*/}
                            {/*    // cookies().delete('user');*/}
                            {/*}} className="hover:bg-neonBlue rounded-xl bg-gray-50">*/}
                            {/*    Logout*/}
                            {/*</button>*/}
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