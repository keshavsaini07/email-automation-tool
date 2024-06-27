import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse  } from "../utils/common/index.js"

async function auth(req, res){
    try {
      console.log("1 - Inside auth google");
      console.log(req.session);
      console.log(req.user);
      SuccessResponse.data = req.user;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function checkStatus(req, res){
    try {
        console.log("Inside auth status");
        console.log(req.user);
        SuccessResponse.data = { msg : "User Authorized"};
        return req.user ? res.status(StatusCodes.OK).send(SuccessResponse) : res.status(StatusCodes.UNAUTHORIZED).json({msg : "UNAUTHORIZED ACTION"});
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

export default {
    auth,
    checkStatus
}