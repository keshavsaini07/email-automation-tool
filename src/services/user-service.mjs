import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.mjs";
import AppError from "../utils/errors/app-error.js"

async function createUser(data){
    try {
        console.log(data)
        const findUser = await User.findOne({ email: data.email });
        if(findUser){
            throw new AppError(
              "Given User object already exists",
              StatusCodes.BAD_REQUEST
            );
        }
        const user = awaitUser.create(data);
        return user;
    } catch (error) {
        // console.log(error)
        if(error.statusCode == StatusCodes.BAD_REQUEST){
            throw new AppError(
              "Given User object already exists",
              StatusCodes.BAD_REQUEST
            );

        }
        throw new AppError(
          "Cannot create a new user object",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

export default {
    createUser
}