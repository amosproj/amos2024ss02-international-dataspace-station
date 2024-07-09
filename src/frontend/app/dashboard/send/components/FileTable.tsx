import React from 'react';
import {FileInfo, FileTableProps, TableColumnConfig} from "@/data/interface/file";


const FileTable: React.FC<FileTableProps> = ({ files, config }) => {

    const renderRows = () => {
        if (files.length === 0) {
            return (
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" colSpan={config.length}>
                        No files uploaded.
                    </td>
                </tr>
            );
        }

        return files.map((file, index) => (
            <tr key={index}>
                {config.map((column) => (
                    <td key={column.label} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file[column.field]}
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <div className="flex min-h-screen flex-col p-6">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {config.map((column) => (
                        <th key={column.label} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {column.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {renderRows()}
                </tbody>
            </table>
        </div>
    );
};

export default FileTable;
