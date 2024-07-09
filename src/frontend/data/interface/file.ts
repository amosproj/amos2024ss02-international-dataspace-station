export interface FileInfo {
    name: string;
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
    files: FileInfo[];
    config: TableColumnConfig[];
}

export interface TableColumnConfig {
    label: string;
    field: keyof FileInfo;
}

export interface Asset {
    date: string;
    name: string;
    author: string;
    id: string;
    contenttype: string;
    size: string;
    baseUrl: string;
}

export interface CatalogItem {
    date: string;
    name: string;
    author: string;
    id: string;
    title: string;
    contenttype: string;
    size: string;
    contractIds: string[];
}

export interface Policy {
    name: string;
    description: string;
    id: string;
}