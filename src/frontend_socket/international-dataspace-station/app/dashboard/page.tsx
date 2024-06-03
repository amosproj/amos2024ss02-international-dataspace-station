'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
    const [cons, setCons] = useState(false);
    const [prov, setProv] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const consResponse = await axios.get('/api/checkPortStatus?port=29191');
                setCons(consResponse.data);

                const provResponse = await axios.get('/api/checkPortStatus?port=19191');
                setProv(provResponse.data);
            } catch (error) {
                console.error('Error occurred while fetching port status:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <main className="flex flex-col p-6">
            <div className="grid grid-cols-2 gap-5">
                <div className="flex justify-evenly items-center bg-gray-100 border-gray-200 border-2 rounded-lg p-5">
                    <p>Consumer: {cons ? 'UP' : 'DOWN'}</p>
                    <button onClick={() => {console.log('click')}} className={`px-4 py-2 rounded-md hover:bg-neonBlue text-white ${cons ? 'bg-red-600' : 'bg-neonGreen'}`}>
                        {cons ? 'Stop' : 'Start'}
                    </button>
                </div>
                <div className="flex justify-evenly items-center bg-gray-100 border-gray-200 border-2 rounded-lg p-5">
                    <p>Provider: {prov ? 'UP' : 'DOWN'}</p>
                    <button onClick={() => {console.log('click')}} className={`px-4 py-2 rounded-md hover:bg-neonBlue text-white ${prov ? 'bg-red-600' : 'bg-neonGreen'}`}>
                        {prov ? 'Stop' : 'Start'}
                    </button>
                </div>
            </div>
        </main>
    );
}
