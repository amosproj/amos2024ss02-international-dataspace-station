'use client';
import {useState, useEffect} from 'react';
import users from '../../../data/users.json';
import {User} from "../../../data/interface/user";
import Cookies from 'js-cookie';

interface FileDetails {
    title: string;
    sender: string;
    receiver: string;
    date: string;
    fileTitle: string;
    fileSize: string;
    link: string;
}

export default function Page() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [subject, setSubject] = useState('');
    const [files, setFiles] = useState<FileDetails[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [receiver, setReceiver] = useState<string>('');
    const [output, setOutput] = useState('');
    const [connectionMessage, setConnectionMessage] = useState('');

    const handleClick = async () => {
      const response = await fetch('/api/execute_command');
      const data = await response.json();
      setOutput(data.output);
      //console.log(data.output);  // Ausgabe in der Konsole anzeigen
      
      // Check if the last command was successful
      if (data.results && data.results.length > 0) {
        const lastCommandResult = data.results[data.results.length - 1];
        if (lastCommandResult.output) {
          setConnectionMessage('The connection has been established.');
        } else {
          setConnectionMessage('Failed to establish the connection.');
        }
      }
    };

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            const user = JSON.parse(userCookie) as User;
            setLoggedInUser(user);
        }
    }, []);

    useEffect(() => {
        if (loggedInUser && users.length > 0) {
            const initialReceiver = users.find(u => u.role !== loggedInUser.role);
            if (initialReceiver) {
                setReceiver(initialReceiver.role);
            }
        }
    }, [loggedInUser, users]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedFile) {
            // Mock backend response
            const mockResponse = {
                success: true,
                fileName: selectedFile.name,
            };

            if (mockResponse.success) {
                const newFile = {
                    title: subject,
                    sender: loggedInUser ? loggedInUser.username : 'Unknown',
                    receiver: receiver,
                    date: new Date().toLocaleDateString(),
                    fileTitle: selectedFile.name,
                    fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
                    link: '#'
                };
                setFiles([...files, newFile]);
                setShowModal(false);
                setSubject('');
            } else {
                alert('File upload failed.');
            }
        }
    };

    return (

        <div className="flex min-h-screen flex-col p-6">
            <div className="flex justify-start pb-5">
                <button onClick={handleClick} className="mb-4 px-4 py-2 rounded-md bg-neonGreen hover:bg-neonBlue text-white">
                    Execute Command
                </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
                    {output && <pre>{output}</pre>}
                    {connectionMessage && <p className="text-black">{connectionMessage}</p>}
            </div>
            <div className="grid grid-cols-2 gap-5"><br></br></div>
            <div className="flex justify-start pb-5">
                <button onClick={() => setShowModal(true)}
                        className="mb-4 px-4 py-2 rounded-md bg-neonGreen hover:bg-neonBlue text-white">
                    Send Data
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {files.length > 0 ? (
                    files.map((file, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{file.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.sender}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.receiver}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.fileTitle}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.fileSize}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-medium text-gray-900">Send Data</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="mt-5">
                                <label htmlFor="subject"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="connector"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receiver</label>
                                <select
                                    id="connector"
                                    name="connector"
                                    value={receiver}
                                    onChange={(e) => setReceiver(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                >
                                    {(users && loggedInUser) && users.filter((u => u.role !== loggedInUser.role)).map((u, index) => (
                                        <option key={index} value={u.role}>{u.role}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attach
                                    file</label>
                                <input
                                    type="file"
                                    name="file-upload"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-white hover:file:bg-neonGreen"
                                    required
                                />
                            </div>
                            <div className="flex justify-center mt-10">
                                <button type="button" onClick={() => setShowModal(false)}
                                        className="px-4 mr-5 py-2 rounded-md bg-red-400 hover:bg-neonBlue text-white">Cancel
                                </button>
                                <button type="submit"
                                        className="px-4 py-2 rounded-md bg-neonGreen hover:bg-neonBlue text-white">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
