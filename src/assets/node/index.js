const express = require("express");
const cors = require("cors");
const chatRoute = require("./routes/chat_routes");
const statusRoute = require("./routes/status_routes");

const app = express();
const port = 3001;


// Middleware setup
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Use express.json() for parsing JSON bodies

// Multer setup for file uploads



// Routes setup
app.use("/api/status", statusRoute);
app.use("/api/chat", chatRoute);


// Start server
const start = async () => {
    app.listen(port, () => {
        console.log("App is running on port", port);
    });
};


start();
