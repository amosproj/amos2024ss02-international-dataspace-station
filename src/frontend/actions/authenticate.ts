import { User } from '../data/interface/user';
import users from '../data/users.json';

const userArray: User[] = users;

export const authenticate = (username: any, password: any) => {

    if (!username || !password) {
        return null
    }

    const user = userArray.find(u => u.username === username && u.password === password);

    return user
};