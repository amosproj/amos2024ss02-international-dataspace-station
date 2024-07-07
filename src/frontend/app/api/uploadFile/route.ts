import {NextApiRequest, NextApiResponse} from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('http://database:8081/files/upload');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
