interface FileDetails {
    id: string;
    title: string;
    sender: string;
    receiver: string;
    date: string;
    fileTitle: string;
    fileSize: string;
    link: string;
}

interface FileTableProps {
    files: FileDetails[];
}

const FileTable: React.FC<FileTableProps> = ({ files }) => {
    return (
        <div className="flex min-h-screen flex-col p-6">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" colSpan={6}>
                            No files uploaded.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default FileTable;
