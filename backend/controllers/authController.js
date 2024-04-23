const jwt = require("jsonwebtoken");
const getDB = require("../config/database");
const crypto = require("crypto");
const User = require("../models/User");

const encrypt_key = "mypasswordencrypttechhostel";

// Placeholder login function
const login = async (req, res) => {
  const { email, password } = req.body;

  // Perform validation checks
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide both username and password" });
  }

  let db = await getDB();
  let user_collection = db.collection("users");
  let user = await user_collection.findOne({
    email: email,
    password: encryptPassword(password, encrypt_key),
  });

  if (user) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    const jwt_token = jwt.sign({ user: user.email }, jwtSecretKey, {
      expiresIn: "7d",
    });
    const access_token = jwt.sign({ user: user.email }, jwtSecretKey, {
      expiresIn: "7d",
    });

    // Update user access_token
    await user_collection.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          access_token: access_token,
        },
      }
    );

    //jwt key cookie
    res.cookie("jwt_secure_token", `${jwt_token}`, {
      httpOnly: true,
      expires: expirationDate,
    });
    // personal access token
    res.cookie("access_token", `${access_token}`, {
      httpOnly: true,
      expires: expirationDate,
    });

    res.status(200).json({
      ...user,
      access_token,
      jwt_token,
    });
  } else {
    res.status(401).send("Invalid credentials");
  }
};

const getUser = async (req, res) => {
  const user = await findUser(req);
  res.json(user);
};

async function findUser(req) {
  // Check access_token
  const access_token = req.headers.cookie.split(";")[1].split("=")[1];
  if (!access_token) return res.status(401).send("Unauthorized");

  // Init DB
  const db = await getDB();
  const user_collection = db.collection("users");

  // Get user by access_token
  const user = await user_collection.findOne({
    access_token: access_token,
  });
  console.log(user);
  // Remove access_token
  delete user.access_token;

  return user;
}

async function changePassword(req, res) {
  const { data } = req.body;
  const user = await findUser(req);

  if (user) {
    if (user.password === data.prev_password) {
      let db = await getDB();
      let user_collection = db.collection("users");
      // Update user password
      await user_collection.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            password: encryptPassword(data.new_password, encrypt_key),
          },
        }
      );
      return res.status(200).send("Password successfully changed");
    } else {
      return res.status(400).send("Invalid previous password");
    }
  } else {
    res.status(400).send("User not found");
  }
}

const logout = (req, res) => {
  res.clearCookie("jwt_secure_token", { httpOnly: true });
  res.clearCookie("access_token", { httpOnly: true });
  res.end("Sign out successfully");
};

// Encryption function
function encryptPassword(password, key) {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decryption function
function decryptPassword(encryptedPassword, key) {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const addUser = async (req, res) => {
  const { fullName, email, password, batch, course, year } = req.body;

  // Check if all fields are provided
  if (!fullName || !email || !password || !batch || !course || !year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Connect to the database
  let db = await getDB();
  let user_collection = db.collection("users");

  // Check if the user already exists
  let userExists = await user_collection.findOne({ email: email });
  if (userExists) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Encrypt the password
  const encryptedPassword = encryptPassword(password, encrypt_key);

  // Create a new user object
  const newUser = {
    fullName,
    email,
    password: encryptedPassword,
    batch,
    course,
    year,
    accessToken: "", // This will be empty initially
  };

  // Insert the new user into the database
  await user_collection.insertOne(newUser);

  // Respond with success
  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: newUser.email,
      fullName: newUser.fullName,
    },
  });
};

module.exports = {
  login,
  addUser,
  getUser,
  findUser,
  logout,
  changePassword,
  addUser,
};
