const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Error while connecting to database:", error.message);
    }

    mongoose.connection.on("disconnected", () => {
        console.log("Mongodb connection disconnected");
    });
};

module.exports = dbConnect;
