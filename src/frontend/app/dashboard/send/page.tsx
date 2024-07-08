'use client'
import React, { useState, useEffect } from 'react';
import { User } from "../../../data/interface/user";
import Cookies from 'js-cookie';
import Tabs from './components/Tabs';
import Upload from './components/Upload';
import FileTable from './components/FileTable';
import { File } from "../../../data/interface/file";

const config = [
    { label: 'Title', field: 'title' },
    { label: 'File Size', field: 'size' },
    { label: 'Link', field: 'link' },
    { label: 'Sent Date', field: 'sentDate' },
    { label: 'File Type', field: 'type' },
    { label: 'Receiver', field: 'receiver' },
];

const Page = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [sentFiles, setSentFiles] = useState<File[]>([]);

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
                const files = data.map((f: File) => ({
                    id: f.id,
                    uploadDate: f.uploadDate,
                    fileTitle: f.fileTitle,
                    size: f.size,
                    link: f.link
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
        if (loggedInUser) {
            fetchFiles();
        }
    }, [loggedInUser]);

    return (
        <div>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'upload' && <Upload fetchFiles={fetchFiles} uploadedFiles={uploadedFiles} />}
            {activeTab === 'sent' && <FileTable files={sentFiles} config={config} />}
        </div>
    );
};

export default Page;
