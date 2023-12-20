// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Place = require("./models/place");
const Booking = require("./models/booking");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

// Create an Express application
const app = express();

// Set up middleware and configurations
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "tyasuyfiusdvlkdfnblkfsdnfbkjn";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3001",
  })
);

// Function to extract user data from JWT token
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

// Define a test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "test ok" });
});

// User registration endpoint
app.post("/register", async (req, res) => {
  // Extract user registration data from the request body
  const { name, email, password } = req.body;

  try {
    // Create a new user document in the MongoDB User collection
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    // Respond with the created user document
    res.json(userDoc);
  } catch (error) {
    // Handle registration failure
    res.status(422).json({ error: "User registration failed" });
  }
});

// User login endpoint
app.post("/login", async (req, res) => {
  // Extract login credentials from the request body
  const { email, password } = req.body;
  // Find a user document with the provided email in the MongoDB User collection
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    // Check if the provided password matches the hashed password in the database
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // If passwords match, create a JWT token and set it as a cookie
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, {}).json(userDoc);
        }
      );
    } else {
      // Respond with an error if passwords do not match
      res.status(422).json("Password not correct");
    }
  } else {
    // Respond with an error if the user with the provided email is not found
    res.status(404).json("User not found");
  }
});

// Endpoint to get user profile information
app.get("/profile", (req, res) => {
  // Extract JWT token from cookies
  const { token } = req.cookies;
  if (token) {
    // Verify the token and fetch user data from MongoDB
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ error: "JWT verification failed" });
      }

      try {
        const { name, email, _id } = await User.findById(userData.id);
        // Respond with user profile information
        res.json({ name, email, _id });
      } catch (error) {
        // Handle error fetching user data
        return res.status(500).json({ error: "Error fetching user data" });
      }
    });
  } else {
    // Respond with an error if the token is not found
    res.status(401).json({ error: "Token not found" });
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  // Clear the token cookie
  res.cookie("token", "").json(true);
});

// Endpoint to upload an image by URL
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  // Download and save the image to the 'uploads' directory
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  // Respond with the new image filename
  res.json(newName);
});

// Endpoint to upload images from the local device
const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadFiles = [];

  // Iterate through the uploaded files and process each one
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    // Use replace with a global regular expression to replace all backslashes with forward slashes
    const normalizedPath = newPath.replace(/\\/g, "/");

    // Rename and move the file to the 'uploads' directory
    fs.renameSync(path, normalizedPath);
    // Add the normalized path to the array of uploaded files
    uploadFiles.push(normalizedPath.replace("uploads/", ""));
  }

  // Respond with the array of uploaded file names
  res.json(uploadFiles);
});

// Endpoint to create a new place
app.post("/places", (req, res) => {
  // Extract data from the request body
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;

  // Verify the JWT token
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Create a new place document in the MongoDB Place collection
    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
    });

    // Respond with the created place document
    res.json(placeDoc);
  });
});

// Endpoint to get places owned by a user
app.get("/user-places", (req, res) => {
  // Extract data from the request
  const { token } = req.cookies;

  // Verify the JWT token
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    // Fetch places owned by the user from MongoDB
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

// Endpoint to get details of a specific place by ID
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  // Fetch the place document from MongoDB by ID
  res.json(await Place.findById(id));
});

// Endpoint to update place details
app.put("/places", async (req, res) => {
  // Extract data from the request
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;

  // Verify the JWT token
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    // Fetch the place document from MongoDB by ID
    const placeDoc = await Place.findById(id);

    // Check if the user is the owner of the place
    if (userData.id === placeDoc.owner.toString()) {
      // Update the place document with the new details
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price,
      });
      // Save the updated place document
      await placeDoc.save();
      // Respond with success
      res.json("ok");
    }
  });
});

// Endpoint to get a list of all places
app.get("/places", async (req, res) => {
  // Fetch all places from MongoDB
  res.json(await Place.find());
});

// Endpoint to create a new booking
app.post("/bookings", async (req, res) => {
  // Extract data from the request
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  // Create a new booking document in the MongoDB Booking collection
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      // Respond with the created booking document
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

// Endpoint to get a list of bookings for the authenticated user
app.get("/bookings", async (req, res) => {
  // Extract user data from the request
  const userData = await getUserDataFromReq(req);
  // Fetch bookings for the user from MongoDB, populating the associated place information
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

// Start the Express app on port 4000
app.listen(4000);
