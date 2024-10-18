import mongoose from "mongoose";
import { User } from "../models/user.model.js"



//adding demo user

const createUser = async () => {
    const userData = new User({
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'securepassword123', // Make sure to hash passwords in production
        firstname: 'John',
        middlename: 'Michael',
        lastname: 'Doe',
        phone: [1234567890, 9876543210], // Example of an array of numbers
        village: 'Springfield',
        state: 'Illinois',
    });

    // Save the demo user to the database
    await userData.save()
        .then(() => {
            console.log('Demo user saved successfully!');
            mongoose.connection.close(); //Close the connection after saving
        })
        .catch((error) => {
            console.error('Error saving demo user:', error);
        });
}

export { createUser };