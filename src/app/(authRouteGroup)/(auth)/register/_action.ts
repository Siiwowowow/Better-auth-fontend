/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(commonLayout)/(auth)/register/_action.ts
"use server";

import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerAction(payload: IRegisterPayload, redirectPath?: string) {
  try {
    // Validate payload
    const validated = registerZodSchema.safeParse(payload);
    if (!validated.success) {
      return {
        success: false,
        message: validated.error.issues[0].message,
      };
    }

    const res = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: data.message || "Registration successful. Please check your email for verification code.",
      data: data.data,
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error.message || "An error occurred during registration",
    };
  }
}