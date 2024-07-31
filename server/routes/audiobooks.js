const router = require("express").Router();
const Audiobook = require("../models/Audiobook");
const audiobooks = require("../config/audiobooks.json");

router.get("/audiobooks", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = req.query.genre || "All";

        const genreOptions = [
            "Horror",
            "Drama",
            "Mystery",
            "Sci-Fi",
            "Biography",
            "Romance",
            "Adventure",
            "Thriller",
            "Crime Fiction",
            "Short Story"
        ];

        genre === "All"
            ? (genre = [...genreOptions])
            : (genre = req.query.genre.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const audiobooks = await Audiobook.find({ title: { $regex: search, $options: "i" } })
            .where("genre")
            .in([...genre])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await Audiobook.countDocuments({
            genre: { $in: [...genre] },
            title: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            genres: genreOptions,
            audiobooks,
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.get("/audiobooks/:id", async (req, res) => {
    try {
        const audiobook = await Audiobook.findById(req.params.id);
        if (!audiobook) return res.status(404).json({ error: true, message: "Audiobook not found" });

        res.status(200).json({ error: false, audiobook });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// const insertAudiobooks = async () => {
//     try {
//         await Audiobook.deleteMany({}); // Clear the collection
//         const docs = await Audiobook.insertMany(audiobooks); // Insert new data
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

// insertAudiobooks()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err));

module.exports = router;
