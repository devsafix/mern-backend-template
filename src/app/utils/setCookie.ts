import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Set auth cookies (HttpOnly + Secure)
 */
export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true, // JS cannot access → prevents XSS
      secure: true, // only over HTTPS
      sameSite: "none", // cross-site cookie allowed (e.g. frontend + backend on different domains)
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};
