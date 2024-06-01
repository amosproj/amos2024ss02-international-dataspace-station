'use client';
import checkConnectorStatus from "./connector_status";

export default async function Page() {
    const cons = await checkConnectorStatus(29191);
    const prov = await checkConnectorStatus(19191);
    return (
        <main className="flex flex-col p-6">
            <div className="grid grid-cols-2 gap-5">
                <div className="flex justify-evenly items-center bg-gray-200 border-gray-300 border-2 rounded-lg p-5">
                    <p>Consumer: {cons ? 'UP': 'DOWN'}</p>
                    <button onClick={ () => {console.log('click')}} className={`rounded-lg px-5 py-2 ${cons ? 'bg-red-600' : 'bg-neonGreen'}`}>
                        {cons ? 'Stop': 'Start'}
                    </button>
                </div>
                <div className="flex justify-evenly items-center bg-gray-200 border-gray-300 border-2 rounded-lg p-5">
                    <p>Provider: {prov ? 'UP': 'DOWN'}</p>
                    <button onClick={ () => {console.log('click')}} className={`rounded-lg px-5 py-2 ${prov ? 'bg-red-600' : 'bg-neonGreen'}`}>
                        {prov ? 'Stop': 'Start'}
                    </button>
                </div>
            </div>
        </main>
    );
}