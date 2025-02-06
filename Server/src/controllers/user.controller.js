import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Adding new
const createUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    firstname,
    middlename,
    lastname,
    phone,
    village,
    state,
  } = req.body;
  //validate required user fields
  if (!username || username.trim() === "")
    throw new ApiError(400, "Username is required!");
  if (!email || email.trim() === "")
    throw new ApiError(400, "Email is required!");
  if (!password || password.trim() === "")
    throw new ApiError(400, "Password is required!");
  if (!firstname || firstname.trim() === "")
    throw new ApiError(400, "First name is required!");
  if (!lastname || lastname.trim() === "")
    throw new ApiError(400, "Last name is required!");
  if (!phone || phone.length == 0)
    throw new ApiError(400, "Phone number is required!");

  //check for valid email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    throw new ApiError(400, "Invalid email address.");

  // Check if the user already exists
  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) throw new ApiError(409, "User already exist");

  //create new user
  const userData = new User({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: password,
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    phone: phone,
    village: village,
    state: state,
  });
  //saving data
  await userData.save();

  const userIsCreated = await User.findById(userData._id).select(
    "-password -refreshToken"
  );
  if (!userIsCreated)
    throw new ApiError(500, "Something went wrong while creating user");

  // Sending a success response
  return res
    .status(201)
    .json(
      new ApiResponse(201, userIsCreated, "User has been successfully created.")
    );
});

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
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const logInUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //check for empty field
  if (!(username || email))
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


const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

export { createUser, logInUser, logOutUser };