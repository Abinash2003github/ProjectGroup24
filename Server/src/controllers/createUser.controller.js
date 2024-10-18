import { User } from "../models/user.model.js";

// Adding new user
const createUser = async (req, res) => {
  try {
    const userData = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      phone: req.body.phone,
      village: req.body.village,
      state: req.body.state,
    });

    //saving data
    await userData.save();

    // Sending a success response
    res.status(201).json({ "message": "User has been successfully created." });
  } catch (error) {
    // Log error and send error response
    console.error("User creation failed!:", error);
    res.status(500).json({ message: "User creation failed!", error: error.message });
  }
};

export { createUser };
