const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errors = require("http-errors");

class userService {
  async storeUserData(userData) {
    try {
      const { password, ...rest } = userData;
      const userDetail = await userModel.findOne({ email: rest.email });
      const userNameDetail = await userModel.findOne({ username: rest.username });
      if (userDetail) {
        throw errors.Conflict("Email already exists");
      }
      if (userNameDetail) {
        throw errors.Conflict("User name already exists");
      }
      //encrypt user password
      const encryptedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
      const user = new userModel({ ...rest, password: encryptedPassword });
      const result = await user.save();
      return result;
    } catch (e) {
      console.log("error", e);
      throw e;
    }
  }

  async getUserByUsername(username) {
    const user = await userModel.findOne({ username }, { __v: 0 });
    return user?._doc;
  }

  async login(data) {
    if (!data.password) return { message: "Password is missing", success: false };
    const userData = await this.getUserByUsername(data.username);
    if (!userData) {
      console.log("user not found");
      return { message: "User not found", success: false };
    }
    const verifyPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(data.password, userData?.password, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        return;
      });
    });

    if (verifyPassword) {
      //generate token with expiry in 1 hour
      const token = jwt.sign(
        { email: userData?.email, id: userData?._id },
        process.env.JWT_SECRET, // mysecretkey
        { expiresIn: 60 * 60 }
      );
      return { ...userData, token, success: true };
    } else {
      return { message: "Invalid username or password", success: false };
    }
  }
}

module.exports = userService;
