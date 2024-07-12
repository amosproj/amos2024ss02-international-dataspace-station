"use server";

import { signIn } from "@/auth";

export async function handleSignIn(formData: FormData) {
    await signIn("credentials", formData);
    return;
}
