interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                <li className="mr-2" role="presentation">
                    <button
                        className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'upload' ? 'border-blue-500' : ''}`}
                        onClick={() => setActiveTab('upload')}
                        type="button"
                        role="tab"
                        aria-controls="upload"
                        aria-selected={activeTab === 'upload'}
                    >
                        Upload
                    </button>
                </li>
                <li role="presentation">
                    <button
                        className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'sent' ? 'border-blue-500' : ''}`}
                        onClick={() => setActiveTab('sent')}
                        type="button"
                        role="tab"
                        aria-controls="sent"
                        aria-selected={activeTab === 'sent'}
                    >
                        Sent
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Tabs;
