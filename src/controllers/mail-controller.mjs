import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";
import { MailService } from "../services/index.mjs";

async function fetchEmails(req, res) {
  try {
    const accessToken = req.session.passport.user.token;
    const user = await MailService.fetchEmails(accessToken);
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

export default {
  fetchEmails,
};
