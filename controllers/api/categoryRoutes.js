const express = require('express');
const router = express.Router();
const fetch = require('node-fetch').default();

const APIKey = "ca6843ad46b947099b5a639778e7a3be";
const genresAPI = "https://api.rawg.io/api/genres";

// Middleware function that fetches genres from the API
const fetchGenresMiddleware = async (req, res, next) => {
    try {
        const response = await fetch(genresAPI + `?key=${APIKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Attach the fetched genres to the request object for later use
        req.genres = data.results; // Adjust this line based on the actual structure of your API response

        next();
    } catch (error) {
        console.error("Error:", error);
        next(error); // Pass the error to the error handling middleware
    }
};

// Use the middleware for all routes in this router
router.use(fetchGenresMiddleware);

// // Example route handler using the fetched genres
// router.get('/categories', (req, res) => {
//     // Access the fetched genres through req.genres
//     const genres = req.genres;
//
//     // Use the genres in your response or further processing
//     res.json({ genres });
// });

module.exports = router;
