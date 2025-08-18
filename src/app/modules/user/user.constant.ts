export const userRoles = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
