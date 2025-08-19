import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

/**
 * Generate a JWT token
 * @param payload - Data to encode inside the token
 * @param secret - Secret key for signing
 * @param expiresIn - Expiration time (e.g., "1d", "2h")
 * @returns Signed JWT token
 */
export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
): string => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

/**
 * Verify a JWT token
 * @param token - Token to verify
 * @param secret - Secret key used for verification
 * @returns Decoded payload if valid
 * @throws Error if token is invalid or expired
 */
export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | string => {
  return jwt.verify(token, secret);
};
