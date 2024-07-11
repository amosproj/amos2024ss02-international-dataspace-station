import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "@/auth";

export default function SignIn() {

    return (
        <div className="flex min-h-screen justify-center items-center p-6 bg-black">
            <div className="w-full max-w-sm bg-white rounded-xl p-10 text-center shadow-2xl shadow-neonBlue">
                <div className="flex flex-col justify-center items-center py-3">
                    <Image src="/logo.png" alt="Logo" width={150} height={150} />
                    <h1 className="text-2xl mt-2 font-semibold tracking-tight">Sign In</h1>
                    {/*<p className="text-sm  text-muted-foreground">*/}
                    {/*    Enter your account to sign-in to the system*/}
                    {/*</p>*/}
                </div>
                <form className="mt-5" 
                    action={async (formData) => {
                        "use server"
                        console.log("SIGNING IN");
                        console.log(await signIn("credentials", formData))
                    }}
                >
                    <input type="hidden" name="redirectTo" value="/dashboard" />
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            name="username"
                            type="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
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
