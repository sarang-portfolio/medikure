import { MessageHandler } from "../../utility/response-handler";

export const authResponse = {
  NOT_FOUND: new MessageHandler(404, "USER NOT FOUND!"),
  INVALID_CREDENTIALS: new MessageHandler(409, "INVALID CREDENTIALS!"),
  SIGNUP_SUCCESSFULL: new MessageHandler(201, "SIGNUP SUCCESSFULL!"),
  USER_ALREADY_EXISTS: new MessageHandler(409, "USER ALREADY EXISTS"),
  PASSWORD_DO_NOT_MATCH: new MessageHandler(409, "PASSWORD DO NOT MATCH!"),
  GOOGLE_SIGN_IN_SUCCESSFULL: new MessageHandler(
    200,
    "GOOGLE SIGNIN SUCCESSFULL"
  ),
  USER_VERIFIED: new MessageHandler(200, "USER VERIFIED"),
  RESET_PASSWORD_LINK: new MessageHandler(200, "RESET PASSWORD LINK SENT"),
  PASSWORD_RESET_SUCCESSFULL: new MessageHandler(
    200,
    "PASSWORD RESET SUCCESSFULL"
  ),
};
