/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import { envVariables } from "../config/env";
import { User } from "../modules/user/user.model";
import { IUser } from "../modules/user/user.interface";
import { userRoles } from "../modules/user/user.constant";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVariables.ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      envVariables.ADMIN_PASSWORD,
      Number(envVariables.BCRYPT_SALT_ROUND)
    );

    const payload: IUser = {
      name: "Admin",
      role: userRoles.ADMIN,
      email: envVariables.ADMIN_EMAIL,
      password: hashedPassword,
      isBlocked: false,
    };

    const superAdmin = await User.findOneAndUpdate(
      { email: envVariables.ADMIN_EMAIL },
      { $set: payload },
      { new: true, upsert: true }
    );

    console.log(`✅ Admin created successfully: ${superAdmin.email}`);
  } catch (error) {
    console.error("❌ Failed to seed super admin:", error);
  }
};
