"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { handleSignIn } from "@/actions/handleSignIn";
import { Blocks } from "react-loader-spinner";

export default function SignIn() {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        try {
            setLoading(true);
            await handleSignIn(formData);
        } catch (error) {
            setErrorMessage("Failed to sign in. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen justify-center items-center p-6 bg-black">
            <div className="w-full max-w-sm bg-white rounded-xl p-10 text-center shadow-2xl shadow-neonBlue">
                <div className="flex flex-col justify-center items-center py-3">
                    <Image src="/logo.png" alt="Logo" width={150} height={150} className="mb-8"/>
                </div>
                    <div className={` absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center ${loading ? "" : "opacity-0"}`}>
                        <Blocks
                            height="110"
                            width="110"
                            color="#05eb42"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            visible={true}
                        />
                    </div>
                <form className={`mt-5 ${loading ? "opacity-0 pointer-events-none" : ""}`}
                    onSubmit={e => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleSubmit(formData);
                    }}>
                    <input type="hidden" name="redirectTo" value="/dashboard" />
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            name="username"
                            type="username"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className={`mb-4 text-red-600 h-12 ${errorMessage ? "" : "opacity-0" }`}>
                        {errorMessage}
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
