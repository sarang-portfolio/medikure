import { MessageHandler } from "../utility/response-handler";

export const userReponse = {
  NOT_FOUND: new MessageHandler(404, "USER NOT FOUND!"),
  USER_CREATED: new MessageHandler(201, "USER CREATED!"),
};
