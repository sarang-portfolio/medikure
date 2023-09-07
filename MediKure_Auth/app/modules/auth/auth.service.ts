import axios from "axios";
import { comparePassword, createHash } from "../../utility/password";
import { ILogin, ISignUp } from "./auth.types";
import { createToken, verifyToken } from "../../utility/authorize";
import { authResponse } from "./auth.constants";
import { sendEmail } from "../../utility/email";
const signUp = async (credentials: ISignUp) => {
  try {
    const user = await axios.get(
      `http://localhost:3000/user/findByEmail/${credentials.email}`
    );
    if (user.data.data) {
      throw authResponse.USER_ALREADY_EXISTS;
    }
    if (credentials.password !== credentials.confirmPassword) {
      throw authResponse.PASSWORD_DO_NOT_MATCH;
    }
    const originalPassword = credentials.password;
    const hashedPassword = await createHash(originalPassword);
    credentials.password = hashedPassword;
    if (credentials.roleId) {
      const response = await axios.post("http://localhost:3000/user/create", {
        ...credentials,
        isActive: true,
      });
      return authResponse.SIGNUP_SUCCESSFULL;
    }
    const role = await axios.get("http://localhost:3000/role/findByRole/USER");
    const response = await axios.post("http://localhost:3000/user/create", {
      ...credentials,
      roleId: role.data.data.id,
    });
    const token = createToken({ email: credentials.email });
    const verifyLink = `http://localhost:3000/auth/verify/${token}`;
    await sendEmail(
      `${credentials.email}`,
      "Login Details",
      `
            Hi User!,

            Please verify your email by clicking on the link below.

            ${verifyLink}

        `
    );
    return authResponse.SIGNUP_SUCCESSFULL;
  } catch (err: any) {
    throw err.response?.data?.error || err;
  }
};

const login = async (credentials: ILogin) => {
  try {
    const user = await axios.get(
      `http://localhost:3000/user/findByEmail/${credentials.email}`
    );
    const passwordIsMatched = await comparePassword(
      credentials.password,
      user.data.data.password
    );
    if (!user.data || !passwordIsMatched || !user.data.data.isActive)
      throw authResponse.NOT_FOUND;

    const userRole = await axios.get(
      `http://localhost:3000/role/findById/${user.data.data.roleId}`
    );
    const token = createToken({
      id: user.data.data.id,
      roleId: user.data.data.roleId,
    });
    return { accessToken: token, role: userRole.data.data.role };
  } catch (err: any) {
    throw err.response?.data?.error || err;
  }
};

const googleSignIn = async (email: string, googleId: string) => {
  try {
    const existingUser: any = await axios.get(
      `http://localhost:3000/user/findByEmail/${email}`
    );
    if (existingUser.data.data) {
      const token = createToken({ userId: existingUser.id });
      return { token: token };
    }
    const userRole = await axios.get(
      "http://localhost:3000/role/findByRole/USER"
    );
    const newUser = await axios.post("http://localhost:3000/user/create", {
      email: email,
      password: "123456",
      roleId: userRole.data.data.id,
      googleId: googleId,
    });
    return authResponse.GOOGLE_SIGN_IN_SUCCESSFULL;
  } catch (err) {
    throw err;
  }
};

const verifyUser = async (token: string) => {
  try {
    const payload: any = verifyToken(token);
    const user = await axios.get(
      `http://localhost:3000/user/findByEmail/${payload.email}`
    );
    if (!user.data.data) throw "INVALID VERIFICATION LINK OR EXPIRED";
    await axios.put(`http://localhost:3000/user/update/${user.data.data.id}`, {
      isActive: true,
    });
    return authResponse.USER_VERIFIED;
  } catch (err: any) {
    throw err.response.data.err || err;
  }
};

const forgotPassword = async (email: string) => {
  try {
    const user = await axios.get(
      `http://localhost:3000/user/findByEmail/${email}`
    );
    if (!user.data.data) {
      throw authResponse.NOT_FOUND;
    }
    const token = createToken({ email });
    const resetLink = `http://localhost:3000/auth/reset-password/${token}`;
    await sendEmail(
      `${email}`,
      "RESET PASSWORD",
      `
            Hi User!,

            Please verify your email by clicking on the link below.

            ${resetLink}

        `
    );
    return authResponse.RESET_PASSWORD_LINK;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (response: any, token: string) => {
  try {
    const verifiedToken: any = verifyToken(token);
    if (
      response.newPassword !== response.confirmNewPassword ||
      !verifiedToken
    ) {
      throw authResponse.PASSWORD_DO_NOT_MATCH;
    }
    const user = await axios.get(
      `http://localhost:3000/user/findByEmail/${verifiedToken.email}`
    );
    const hashedPassword = await createHash(response.newPassword);
    await axios.put(`http://localhost:3000/user/update/${user.data.data.id}`, {
      password: hashedPassword,
    });
    return authResponse.PASSWORD_RESET_SUCCESSFULL;
  } catch (error) {
    throw error;
  }
};

export default {
  signUp,
  login,
  googleSignIn,
  verifyUser,
  forgotPassword,
  resetPassword,
};
