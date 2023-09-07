export interface ISignUp {
  email: string;
  password: string;
  confirmPassword?: string;
  googleId?: string;
  linkedinId?: string;
  roleId?: string;
}

export interface ILogin {
  email: string;
  password: string;
}
