const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs-extra");
const path = require("path");

const app = express();
const port = 9340;


// Set paths
const publicPath = path.join(__dirname, "../public");
const assetsPath = path.join(__dirname, "../public/assets");
const dataPath = path.join(__dirname, "../public/data");
const srcPath = path.join(__dirname, "../src");

// Configure express virtual folders
app.use(express.static(publicPath));
app.use("/src", express.static(srcPath));

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: "50mb" }));




app.post('/save-state/:filename', async (req, res) => {
    const jsonString = JSON.stringify(req.body);
    try {
        const fileName = `${req.params.filename}.json`
        const filePath = path.join(dataPath, fileName);

        await fs.writeFile(filePath, jsonString);

        console.log('Successfully wrote file');
        res.send('Successfully wrote JSON to file.');
    }
    catch (error) {
        console.log('Error writing file', error);
        res.status(500).send("Failed to save the file: " + error.message);
    }
});

app.post("/upload-canvas", async (req, res) => {
    //if (req.file && req.body.filename) {
        const data = req.body.image;  // Get image data URL from request body
        const base64Data = data.replace(/^data:image\/png;base64,/, "");

        const fileName = "cheval.png"; //req.body.filename; // Read filename from the body, specified by client
        const filePath = path.join(assetsPath, fileName);

        try {
            await fs.ensureDir(assetsPath);

            // Write the file to disk
            await fs.writeFile(filePath, base64Data, "base64");
            res.status(200).send("File uploaded and saved as " + fileName);
        }
        catch (error) {
            res.status(500).send("Failed to upload file: " + error.message);
        }
    //}
    //else {
    //    res.status(400).send("No file uploaded or filename not specified.");
    //}
});



app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
