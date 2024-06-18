'use client';
import React, { useState } from "react";
import Image from "next/image";
import { authenticate } from '../actions/authenticate';

const SignIn = ({ logoSrc = "/logo.png", signInText = "Sign In", onSubmit }) => {
    const [username, setUsername] = useState('hey');
    const [password, setPassword] = useState('123');

    const handleSubmit = (e) => {
        e.preventDefault();
        // authenticate({ username, password });
        // if (onSubmit) {
        //     onSubmit({ username, password });
        // }
    };

    return (
        <div className="flex min-h-screen justify-center items-center p-6 bg-black">
            <div className="w-full max-w-sm bg-white rounded-xl p-10 text-center shadow-2xl shadow-neonBlue">
                <div className="flex flex-col justify-center items-center py-3">
                    <Image src={logoSrc} alt="Logo" width={150} height={150} />
                    <h1 className="text-2xl mt-2 font-semibold tracking-tight">{signInText}</h1>
                </div>
                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-neonGreen rounded-lg hover:bg-neonBlue hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
