const mongoose = require("mongoose");

const { mongodbURI } = require("./config");

mongoose
    .connect(mongodbURI)
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB : ", error);
    });
