// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Sample route for login
// app.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     // Simulate checking credentials (replace with database logic)
//     if (username === "admin" && password === "admin123") {
//         return res.json({ message: "Login successful", status: "success" });
//     } else {
//         return res.json({ message: "Invalid credentials", status: "error" });
//     }
// });

// // Sample route for signup
// app.post("/signup", (req, res) => {
//     const { username, email, password } = req.body;

//     // Simulate saving user to database (replace with actual logic)
//     console.log(`User signed up: ${username}, ${email}`);

//     return res.json({ message: "Signup successful", status: "success" });
// });

// // Starting the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define a schema and model for travel data
const travelSchema = new mongoose.Schema({
    place: String,
    days: Number,
});

const Travel = mongoose.model('Travel', travelSchema);

// Handle form submissions
app.post('/submit-travel', (req, res) => {
    const { place, days } = req.body;

    // Create a new document
    const newTravel = new Travel({
        place: place,
        days: parseInt(days),
    });

    // Save to the database
    newTravel.save()
        .then(() => {
            res.send('Data successfully saved to MongoDB!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error saving data to the database.');
        });
});

// Serve the HTML form
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
