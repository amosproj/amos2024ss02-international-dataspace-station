'use server';

import { redirect} from 'next/navigation';
import { cookies } from 'next/headers';

import { User } from '../data/interface/user';
import users from '../data/users_bank.json';

const userArray: User[] = users;

export const authenticate = (formData: { password: string; username: string }) => {
    const username = formData.username;
    const password = formData.password;

    if (!username || !password) {
        return {
            message: 'Please fill all fields',
            success: false,
        };
    }

    const user = userArray.find(u => u.username === username && u.password === password);

    if (user){
        cookies().set('user' as any, JSON.stringify(user) as any);
        redirect('/dashboard');
    }
};