require('dotenv').config();
const express = require("express");
const dbConnect = require("./dbConnect");
const audiobookRoutes = require("./routes/audiobooks");
const cors = require("cors");

const app = express();

dbConnect();

app.use(express.json());

const corsOptions = {
    origin: 'https://rating-app-frontend.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api", audiobookRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
