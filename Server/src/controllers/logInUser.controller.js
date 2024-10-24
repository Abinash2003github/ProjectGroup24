import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (UserId) => {
  try {
    //find user
    const user = await User.findById(UserId);

    //generate tokens
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    //save refresh Token in database
    user.refreshToken = refreshToken;
    await user.save({ ValidateBeforeSave: false });

    //return tokens
    return { accessToken, refreshToken };
  } catch (error) {
    // throw new ApiError(
    //   500,
    //   "Something went wrong while generating refresh and access token"
    // );
    throw new ApiError(
      500,
      error.message
    );
  }
};

const logInUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //check for empty field
  if (!username || !email)
    throw new ApiError(400, "username or password required!");

  //check if user exist
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) throw new ApiError(404, "User does not exist.");

  //check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logInUser,
          accessToken,
          refreshToken,
        },
        "User loggedin successful"
      )
    );
});


export { logInUser };
