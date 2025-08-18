import bcrypt from "bcryptjs";

export const BcryptHelper = {
  comparePassword: (plain: string, hashed: string) => {
    return bcrypt.compare(plain, hashed);
  },
};
