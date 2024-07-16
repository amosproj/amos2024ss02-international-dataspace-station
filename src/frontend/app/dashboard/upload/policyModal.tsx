'use client';
import { createPolicy } from '@/actions/api';
import React, { useState, useEffect, FormEvent } from 'react';

interface PolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setErrorMessage("");
            await createPolicy(name, description);
            onClose();
        } catch(err) {
            setErrorMessage("There was a problem creating the policy.");
        }
    }

    if(!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
            <div className="bg-white p-6 rounded">
                <form onSubmit={handleCreate} className="flex gap-4 flex-col">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">Policy Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <div className="flex justify-end">
                        <button onClick={() => onClose()} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}


export default PolicyModal;