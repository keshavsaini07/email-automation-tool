import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse  } from "../utils/common/index.js"
import { UserService } from "../services/index.mjs";

async function createUser(req, res) {
  try {
    const user = await UserService.createUser({
      email: req.body.email,
      fullname: req.body.fullname,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

export default {
    createUser, 
}