import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/ApiError.js";
import config from "../common/config.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Access token missing");
    }

    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    req.user = decoded; // Attach decoded payload (e.g., user ID) to request
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
};
