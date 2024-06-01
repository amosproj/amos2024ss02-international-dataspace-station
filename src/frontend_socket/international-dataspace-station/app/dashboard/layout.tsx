import SideNav from 'dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full md:w-64 flex-none">
                <SideNav />
            </div>
            <div className="flex-grow md:flex flex-col">
                <div className="flex-none p-6 bg-gray-800 text-white">Header</div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
