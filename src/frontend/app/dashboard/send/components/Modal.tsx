import React, { useEffect, useState } from 'react';
import { Policy } from '@/data/interface/file';

interface ModalProps {
    setShowModal: (show: boolean) => void;
    handleFileChange: (file: File | null) => void;
    handleFileUpload: (title: string, policy: string) => void;
    policies: Policy[];
}

const Modal: React.FC<ModalProps> = ({ setShowModal, handleFileChange, handleFileUpload, policies }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [selectedPolicy, setSelectedPolicy] = useState<string>('');

    const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.size > 10 * 1024 * 1024) {
                setErrorMessage('File size exceeds 10 MB.');
                handleFileChange(null);
            } else {
                handleFileChange(file);
                setErrorMessage(null);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!errorMessage) {
            console.log(policies);
            var policyId = selectedPolicy;
            if (!policyId) {
                policyId = policies[0].id;
            }
            console.log(policyId)
            handleFileUpload(title, policyId);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
            <div className="bg-white p-8 rounded-md shadow-md z-10">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Upload File</h2>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="policy" className="block mb-2 text-sm font-medium">Policy</label>
                        <select
                            name="policy"
                            id="policy"
                            value={selectedPolicy}
                            onChange={(e) => {console.log("setting policy id"); setSelectedPolicy(e.target.value)}}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                            {policies.map((policy) => (
                                <option key={policy.id} value={policy.id}>
                                    {policy.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="file"
                        onChange={handleFileSelection}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-neonGreen hover:bg-neonBlue text-white w-full"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
