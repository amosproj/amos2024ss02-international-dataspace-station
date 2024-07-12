import { User } from '@/data/interface/user';
import users from '@/data/users.json';

type UserDatabase = {
    username: string;
    image: string;
    password: string;
}

type Users = {
    bank: UserDatabase[];
    company: UserDatabase[];
    taxadvisor: UserDatabase[];
};

const participant: keyof Users = (process.env.NEXT_PUBLIC_CONNECTOR_NAME as keyof Users) || "bank";

const userArray: UserDatabase[] = (users as Users)[participant];

export const authenticate = (username: any, password: any) => {

    if (!username || !password) {
        return null
    }

    const dbUser = userArray.find(u => u.username === username && u.password === password);

    if (!dbUser) return null;

    const user: User = {
        name: dbUser.username,
        image: dbUser.image
    }
    return user
};