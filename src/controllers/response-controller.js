import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";
import { ResponseService } from "../services/index.mjs";

async function generateResponse(req, res) {
  try {
    const response = await ResponseService.generateResponse();
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

export default {
  generateResponse,
};
