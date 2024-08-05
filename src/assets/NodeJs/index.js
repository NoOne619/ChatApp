const express = require("express");
const cors = require("cors");

const userRoute = require("./routes/user_routes");

const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Use express.json() for parsing JSON bodies

// Multer setup for file uploads



// Routes setup
app.use("/api/user", userRoute);

// Start server
const start = async () => {
    app.listen(port, () => {
        console.log("App is running on port", port);
    });
};


start();
