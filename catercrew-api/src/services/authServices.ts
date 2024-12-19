import { JWT_EXPIRATION, JWT_SECRET } from "../config/jwt";
import { IUserModel } from "../models/UserModel";
import UserRepository from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/hashUtils";
import jwt from "jsonwebtoken";

interface ILoginResponse {
  token: string;
  user: IUserModel;
}

class AuthServices {
  async signUp(userData: IUserModel): Promise<IUserModel> {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password before saving the user
    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword; // Save the hashed password

    // Create the user and save it to the database
    const user = await UserRepository.createUser(userData);
    return user;
  }

  async login(email: string, password: string): Promise<ILoginResponse> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is valid
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    if (!JWT_SECRET) {
      throw new Error("Wrong authorization error");
    }
    // Generate the JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Return the token and user details
    return { token, user };
  }
}

export default new AuthServices();
