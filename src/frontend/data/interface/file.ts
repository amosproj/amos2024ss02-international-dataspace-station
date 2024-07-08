export interface File {
    id: string;
    title: string;
    size: string;
    type?: string;
    uploadDate?: string;
    sentDate?: string;
    receiver?: string;
    link: string;
}

export interface FileTableProps {
    files: File[];
    config: TableColumnConfig[];
}

export interface TableColumnConfig {
    label: string;
    field: keyof File;
}