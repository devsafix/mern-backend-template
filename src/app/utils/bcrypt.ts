import bcrypt from "bcryptjs";

export const BcryptHelper = {
  /**
   * Hash a plain text password
   * @param plain - raw user password
   * @param saltRounds - number of salt rounds (default 10)
   * @returns Promise<string> - hashed password
   */
  hashPassword: async (plain: string, saltRounds = 10): Promise<string> => {
    return await bcrypt.hash(plain, saltRounds);
  },

  /**
   * Compare a plain text password with a hashed password
   * @param plain - raw password provided by user
   * @param hashed - hashed password stored in DB
   * @returns Promise<boolean> - true if passwords match
   */
  comparePassword: async (plain: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(plain, hashed);
  },
};
