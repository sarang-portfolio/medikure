import { authResponse } from "../auth/auth.constants";
import authService from "../auth/auth.service";

describe("SIGNUP", () => {
  it("should signup user successfully", async () => {
    const mockSignUp = jest
      .fn()
      .mockResolvedValue(authResponse.SIGNUP_SUCCESSFULL);
    authService.signUp = mockSignUp;

    const result = await authService.signUp({
      email: "sanky@coditas.com",
      password: "123456",
      confirmPassword: "123456",
    });
    expect(mockSignUp).toHaveBeenCalled();
    expect(result).toEqual(authResponse.SIGNUP_SUCCESSFULL);
  });

  it("should throw an error if user already exists", async () => {
    const mockSignUp = jest
      .fn()
      .mockRejectedValue(authResponse.USER_ALREADY_EXISTS);
    authService.signUp = mockSignUp;

    try {
      const result = await authService.signUp({
        email: "sanky@coditas.com",
        password: "123456",
        confirmPassword: "123456",
      });
    } catch (err) {
      expect(mockSignUp).toHaveBeenCalled();
      expect(err).toEqual(authResponse.USER_ALREADY_EXISTS);
    }
  });

  it("should throw an error if password and confirm password do not match", async () => {
    const mockSignUp = jest
      .fn()
      .mockRejectedValue(authResponse.PASSWORD_DO_NOT_MATCH);
    authService.signUp = mockSignUp;

    try {
      await authService.signUp({
        email: "sanky@coditas.com",
        password: "123456",
        confirmPassword: "12345",
      });
    } catch (err) {
      expect(mockSignUp).toHaveBeenCalled();
      expect(err).toEqual(authResponse.PASSWORD_DO_NOT_MATCH);
    }
  });
});
