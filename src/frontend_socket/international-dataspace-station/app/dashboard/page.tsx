'use client';
import React, { useState, useEffect } from 'react';
// import checkConnectorStatus from "./connector_status";
import ConnectorStatus from "./connector_status";
// import {cookies} from "next/headers";
//import portRoles from '../../data/ports.json';
import './styles/style.css';

export default function Page() {

  return (
      <main className="flex flex-col p-6">
          <div className="grid grid-cols-2 gap-5">
              <div className="flex justify-evenly items-center bg-gray-100 border-gray-200 border-2 rounded-lg p-5 text-black">
                  <ConnectorStatus/>
              </div>
          </div>
      </main>
  );
}

// export default function Page() {
//     const [prov, setProv] = useState(false);
//     const loggedIn = cookies().get('user')?.value ? JSON.parse(cookies().get('user').value) : null;
//     const ports = portRoles;
//     const currPort = loggedIn ? ports.find(port => port.role === loggedIn.role)?.port : null;

//     useEffect({

//     }, [])

//     return (
//         <main className="flex flex-col p-6">
//             <div className="grid grid-cols-2 gap-5">
//                 <div className="flex justify-evenly items-center bg-gray-100 border-gray-200 border-2 rounded-lg p-5">
//                     {/*<p>Consumer: {cons ? 'UP' : 'DOWN'}</p>*/}
//                     {/*<button onClick={() => {console.log('click')}} className={`px-4 py-2 rounded-md hover:bg-neonBlue text-white ${cons ? 'bg-red-600' : 'bg-neonGreen'}`}>*/}
//                     {/*    {cons ? 'Stop' : 'Start'}*/}
//                     {/*</button>*/}
//                     <ConnectorStatus port={39191}/>
//                 </div>
//                 {/*<div className="flex justify-evenly items-center bg-gray-100 border-gray-200 border-2 rounded-lg p-5">*/}
//                 {/*    <p>Provider: {prov ? 'UP' : 'DOWN'}</p>*/}
//                 {/*    <button onClick={() => {console.log('click')}} className={`px-4 py-2 rounded-md hover:bg-neonBlue text-white ${prov ? 'bg-red-600' : 'bg-neonGreen'}`}>*/}
//                 {/*        {prov ? 'Stop' : 'Start'}*/}
//                 {/*    </button>*/}
//                 {/*</div>*/}
//             </div>
//         </main>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import checkConnectorStatus from "./connector_status";

// export default function Page() {
//     const [isConnectorRunning, setIsConnectorRunning] = useState(false);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const port = 39191;
//                 const isRunning = await checkConnectorStatus(port);
//                 setIsConnectorRunning(isRunning);
//             } catch (error) {
//                 console.error('Error occurred while fetching port status:', error);
//             }
//         }
//         fetchData();
//     }, []);

//     return (
//         <main className="flex flex-col p-6">
//             <div className="grid grid-cols-2 gap-5">
//                 <div className="flex justify-evenly items-center bg-gray-100 border-gray-200 border-2 rounded-lg p-5">
//                     {isConnectorRunning ? 'Connector is running!' : 'Connector is not running!'}
//                 </div>
//             </div>
//         </main>
//     );
// }