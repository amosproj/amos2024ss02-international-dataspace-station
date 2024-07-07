import { useState } from 'react';

interface ModalProps {
    setShowModal: (show: boolean) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileUpload: () => void;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, handleFileChange, handleFileUpload }) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-md shadow-md z-10">
                <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
                <div className="flex justify-end mb-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <button
                            type="button"
                            onClick={handleFileUpload}
                            className="px-4 py-2 rounded-md bg-neonGreen hover:bg-neonBlue text-white mb-4 w-full"
                        >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
