import React from 'react';

const files = [
    {
        title: 'GraphQL API Documentation',
        sender: 'Leslie Alexander',
        receiver: 'Michael Foster',
        date: 'March 17, 2023',
        dateTime: '2023-03-17T00:00Z',
        fileType: 'Document',
        fileSize: '1.2 MB',
        link: '#'
    },
    {
        title: 'New Benefits Plan',
        sender: 'Leslie Alexander',
        receiver: 'HR Team',
        date: 'May 5, 2023',
        dateTime: '2023-05-05T00:00Z',
        fileType: 'Spreadsheet',
        fileSize: '3.4 MB',
        link: '#'
    },
    {
        title: 'iOS App Source Code',
        sender: 'Leonard Krasner',
        receiver: 'Development Team',
        date: 'June 7, 2023',
        dateTime: '2023-06-07T00:00Z',
        fileType: 'Code',
        fileSize: '10 MB',
        link: '#'
    },
    {
        title: 'Marketing Site Redesign',
        sender: 'Courtney Henry',
        receiver: 'Marketing Team',
        date: 'June 10, 2023',
        dateTime: '2023-06-10T00:00Z',
        fileType: 'HTML',
        fileSize: '15 MB',
        link: '#'
    }
];

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <table className=" divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Download</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file) => (
                    <tr key={file.title}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{file.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.sender}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.fileType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.fileSize}</td>
                        <td className="flex py-4 justify-center gap-2">
                            <a href={file.link}
                               className="px-4 py-2 rounded-md bg-neonGreen hover:bg-neonBlue text-white">
                                Download
                            </a>
                            <a href={file.link}
                               className="px-4 py-2 rounded-md bg-red-400 hover:bg-neonBlue text-white">
                                Delete
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    );
}
