import React, { useState } from 'react';

interface ModalProps {
    setShowModal: (show: boolean) => void;
    handleFileChange: (file: File | null) => void;
    handleFileUpload: () => void;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, handleFileChange, handleFileUpload }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            handleFileUpload();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
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
                <form onSubmit={handleSubmit}>
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
