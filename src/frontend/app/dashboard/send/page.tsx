'use client'
import { useState, useEffect } from 'react';
import { User } from "../../../data/interface/user";
import Cookies from 'js-cookie';
import Tabs from './components/Tabs';
import Upload from './components/Upload';
import FileTable from './components/FileTable';

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

const Page = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<FileDetails[]>([]);
    const [sentFiles, setSentFiles] = useState<FileDetails[]>([]);

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            const user = JSON.parse(userCookie) as User;
            setLoggedInUser(user);
        }
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fetch('/api/getUploadedData');
            if (response.ok) {
                const data = await response.json();
                const files = data.map((file: any) => ({
                    id: file.id,
                    title: 'No Subject',
                    date: new Date().toLocaleDateString(),
                    fileTitle: file.fileName,
                    fileSize: '',
                    link: ``
                }));
                setUploadedFiles(files);
            } else {
                console.error('Failed to fetch files:', response.status);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [loggedInUser]);

    return (
        <div>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'upload' && <Upload fetchFiles={fetchFiles} uploadedFiles={uploadedFiles} />}
            {activeTab === 'sent' && <FileTable files={sentFiles} />}
        </div>
    );
};

export default Page;
