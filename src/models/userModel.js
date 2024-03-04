const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Creating a schema for users which includes username, email and password.
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hashing the password using bcrypt before saving the user to the db.
userSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;

        next(); // Continuing the saving process.
    } catch (error) {
        next(error);
    }
});

// Method to verify the passwords in the log in.
userSchema.statics.verifyPassword = async (enteredPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
