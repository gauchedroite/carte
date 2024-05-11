const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const port = 9340;


// Set paths
const publicPath = path.join(__dirname, "../public");
const assetsPath = path.join(__dirname, "../public/assets");

// Configure express
app.use(express.static(publicPath));

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file && req.body.filename) {
        const fileName = req.body.filename; // Read filename from the body, specified by client
        const filePath = path.join(assetsPath, fileName);

        try {
            await fs.ensureDir(assetsPath);

            // Write the file from memory (buffer) to disk
            await fs.writeFile(filePath, req.file.buffer);
            res.status(200).send("File uploaded and saved as " + fileName);
        }
        catch (error) {
            res.status(500).send("Failed to upload file: " + error.message);
        }
    }
    else {
        res.status(400).send("No file uploaded or filename not specified.");
    }
});



app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
