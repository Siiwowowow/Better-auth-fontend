/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  getDefaultDashboardRoute,
  getRedirectAfterLogin,
  UserRole,
} from "@/lib/authUtils";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/zod/auth.types";
import {
  ILoginPayload,
  loginZodSchema,
} from "@/zod/auth.validation";

import { redirect } from "next/navigation";

export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0]?.message || "Invalid input";

    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data
    );

    const { accessToken, refreshToken, token, user } = response.data;

    const { role, needPasswordChange, email } = user;

    // ✅ set cookies
    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies(
      "better-auth.session_token",
      token,
      24 * 60 * 60
    );

    // ✅ password change flow
    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}`);
    }

    // ✅ correct redirect logic (SAFE)
    const finalRedirect = getRedirectAfterLogin(
      role as UserRole,
      redirectPath
    );

    return {
      success: true,
      redirectUrl: finalRedirect,
      user
    } as any;
  } catch (error: any) {
    console.log(error, "login error");

    // ✅ handle email not verified
    if (
      error?.response?.data?.message === "Email not verified"
    ) {
      redirect(`/verify-email?email=${payload.email}`);
    }

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Login failed",
    };
  }
};