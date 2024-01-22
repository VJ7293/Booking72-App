// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Place = require("./models/place");
const Booking = require("./models/booking");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

// Create an Express application
const app = express();

// Set up middleware and configurations
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "tyasuyfiusdvlkdfnblkfsdnfbkjn";
app.use(cookieParser());
app.use(express.json());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3001",
  })
);

// Now you can use the userData, which may contain the decoded user information

// Function to extract user data from JWT token
// function getUserDataFromReq(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   return new Promise((resolve, reject) => {
//     const token = req.cookies && req.cookies.token;

//     console.log("Received token:", token);

//     if (!token) {
//       reject(jwt.JsonWebTokenError("jwt must be provided"));
//       return;
//     }

//     jwt.verify(token, jwtSecret, {}, (err, userData) => {
//       if (err) {
//         reject(new jwt.JsonWebTokenError("Invalid token"));
//       } else {
//         resolve(userData);
//       }
//     });
//   });
// }
function getUserDataFromReq(req) {
  mongoose.connect(process.env.MONGO_URL);
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

// Define a test endpoint
app.get("/test", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json({ message: "test ok" });
});

// User registration endpoint
app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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
    console.error("User registration failed:", error);
    res.status(422).json({ error: "User registration failed" });
  }
});

// User login endpoint
app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

// Endpoint to get user profile information
app.get("/profile", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  try {
    const userData = await getUserDataFromReq(req);

    const { name, email, _id } = await User.findById(userData.id);
    // Respond with user profile information
    res.json({ name, email, _id });
  } catch (error) {
    // Handle error fetching user data
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Error fetching user data" });
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

  try {
    // Download and save the image to the 'uploads' directory
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    // Respond with the new image filename
    res.json(newName);
  } catch (error) {
    console.error("Image download error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
app.post("/places", async (req, res) => {
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
      console.error("JWT verification failed:", err);
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
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
    } catch (error) {
      console.error("Create place error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// Endpoint to get places owned by a user
// app.get("/user-places", (req, res) => {
//   // Extract data from the request
//   mongoose.connect(process.env.MONGO_URL);
//   const { token } = req.cookies;

//   // Verify the JWT token
//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     // Fetch places owned by the user from MongoDB
//     const { id } = userData;
//     res.json(await Place.find({ owner: id }));
//   });
// });
app.get("/user-places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const userData = await getUserDataFromReq(req);

    // Fetch places owned by the user from MongoDB
    const userPlaces = await Place.find({ owner: userData.id });
    res.json(userPlaces);
  } catch (error) {
    console.error("User places fetch error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Endpoint to get details of a specific place by ID
app.get("/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Place.findById(id));
});
// app.get("/places/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Fetch the place document from MongoDB by ID
//     const placeDetails = await Place.findById(id);
//     res.json(placeDetails);
//   } catch (error) {
//     console.error("Fetch place details error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Endpoint to update place details
app.put("/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      // Fetch the place document from MongoDB by ID
      const placeDoc = await Place.findById(id);

      // Check if the user is the owner of the place and userData is defined
      if (userData && userData.id === placeDoc.owner.toString()) {
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
      } else {
        res
          .status(403)
          .json({ error: "Forbidden: You are not the owner of this place" });
      }
    } catch (error) {
      console.error("Update place error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// Endpoint to get a list of all places
app.get("/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Place.find());
});
// app.get("/places", async (req, res) => {
//   try {
//     // Fetch all places from MongoDB
//     const allPlaces = await Place.find();
//     res.json(allPlaces);
//   } catch (error) {
//     console.error("Fetch all places error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Endpoint to create a new booking
app.post("/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  // Extract data from the request
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  try {
    // Create a new booking document in the MongoDB Booking collection
    const bookingDoc = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    });
    // Respond with the created booking document
    res.json(bookingDoc);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get a list of bookings for the authenticated user
app.get("/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});
// app.get("/bookings", async (req, res) => {
//   // Extract user data from the request
//   const userData = await getUserDataFromReq(req);

//   try {
//     // Fetch bookings for the user from MongoDB, populating the associated place information
//     const userBookings = await Booking.find({ user: userData.id }).populate(
//       "place"
//     );
//     res.json(userBookings);
//   } catch (error) {
//     console.error("Fetch user bookings error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Start the Express app on port 4000
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
