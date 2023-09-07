import { MessageHandler } from "../../utility/response-handler";

export const familyResponse = {
  NOT_FOUND: new MessageHandler(404, "USER NOT FOUND!"),
  USER_ALREADY_EXISTS: new MessageHandler(409, "USER ALREADY EXISTS"),
  DATA_CREATED: new MessageHandler(201, "FAMILY DATA CREATED"),
  DATA_NOT_CREATED: new MessageHandler(409, "FAMILY DATA NOT CREATED"),
  DATA_UPDATED: new MessageHandler(409, "FAMILY DATA UPDATED"),
  DATA_NOT_UPDATED: new MessageHandler(409, "FAMILY DATA NOT UPDATED"),
};
