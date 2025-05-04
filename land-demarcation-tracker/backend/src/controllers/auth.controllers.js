import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/async_handler.js";
import config from "../common/config.js";
import User from "../models/user.models.js";

const generateAccessAndRefreshToken = async (userId) => {
    console.log("Generating tokens for user ID: ", userId);
    
    if (!userId) {
        throw new ApiError(400, "User ID is required to generate tokens");
    }
    
    try {
        const user = await User.findByPk(userId);
        console.log("User found: ", user);
        
        const accessToken = user.generateAccessToken();
        console.log("Access Token: ", accessToken);
        const refreshToken = user.generateRefreshToken();
        console.log("Refresh Token: ", refreshToken);

        user.refresh_token = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens", error);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password, role, circle } = req.body;

    if([ name, email, password, role, circle.join(',')].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const isUserExists = await User.findOne({
        where: { email }
    });

    console.log("User Exists: ", isUserExists);

    if(isUserExists) {
        throw new ApiError(401, "User with this email already exists");
    }

    const createUser = await User.create({
        name,
        email,
        password,
        role,
        circle_ids: circle,
    });

    if (!createUser) {
        throw new ApiError(500, "User registration failed");
    }

    return res
            .status(200)
            .json(new ApiResponse(200, createUser.toJSON(), "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if([email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "Email and password both are required");
    }

    const user = await User.findOne({
        where: { email },
        attributes: { exclude: ["refresh_token"] },
    });

    console.log("User: ", user);
    
    if(!user) {
        throw new ApiError(401, "User with this email does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    console.log("Password: ", isPasswordCorrect);
    
    if(!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password");
    }

    console.log("User: ", user.id);

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user.id);

    const loggedInUser = await User.findByPk(user.id, {
        attributes: { exclude: ["password", "refresh_token"] },
    });

    console.log("Logged In User: ", loggedInUser);

    const options = {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
    }

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, { user: loggedInUser.toJSON() }, "Login successful")
            );
});

const logoutUser = asyncHandler(async (req, res) => {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    };
  
    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
});

const getUser = asyncHandler(async (req, res) => {
    // Re‑load the user instance with sensitive fields included
  const user = await User.findByPk(req.user.id, {
    attributes: {
      include: ['password', 'refresh_token'],   // bring back those two columns
      // you can also exclude other sensitive columns here
    }
  })

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  // toJSON() gives you a plain object you can mutate
  const payload = user.toJSON()

  // If you want to send the raw refreshToken cookie value (not recommended):
  // payload.rawRefreshToken = req.cookies.refreshToken

  return res
    .status(200)
    .json(new ApiResponse(200, payload, 'User fetched successfully'))
});
  
export { registerUser, loginUser, logoutUser, getUser };