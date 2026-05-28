const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const generateRoute = require("./routes/generate");

app.use("/api", generateRoute);

app.get("/", (req, res) => {
    res.send("README Auto Generator API Running");
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});