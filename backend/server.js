const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('../vinyl-style/vinylStyleSongs.db');

app.use(cors());

// Define API endpoint to retrieve songs
app.get('/api/songs', (req, res) => {
    db.all('SELECT * FROM songs', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start the server
const port = 8101;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
