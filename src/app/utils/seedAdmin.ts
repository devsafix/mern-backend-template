/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import { envVariables } from "../config/env";
import { User } from "../modules/user/user.model";
import { IUser } from "../modules/user/user.interface";
import { userRoles } from "../modules/user/user.constant";

/**
 * Seeds a Super Admin account if it doesn't already exist.
 * Runs only once during application startup.
 */
export const seedSuperAdmin = async (): Promise<void> => {
  try {
    // Check if admin already exists
    const isSuperAdminExist = await User.findOne({
      email: envVariables.ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("ℹ️ Super Admin already exists, skipping seed.");
      return;
    }

    // Hash admin password
    const hashedPassword = await bcryptjs.hash(
      envVariables.ADMIN_PASSWORD,
      Number(envVariables.BCRYPT_SALT_ROUND)
    );

    // Build admin payload
    const payload: IUser = {
      name: "Admin",
      role: userRoles.ADMIN,
      email: envVariables.ADMIN_EMAIL,
      password: hashedPassword,
      isBlocked: false,
    };

    // Create or update admin (upsert ensures only one admin)
    const superAdmin = await User.findOneAndUpdate(
      { email: envVariables.ADMIN_EMAIL },
      { $set: payload },
      { new: true, upsert: true }
    );

    console.log(`✅ Super Admin created successfully: ${superAdmin?.email}`);
  } catch (error) {
    console.error("❌ Failed to seed super admin:", error);
  }
};
