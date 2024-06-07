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

app.post('/next-seqno', async (req, res) => {
    try {
        const filePath = path.join(dataPath, "_state.json");

        // Read and parse the state.json file
        let data = await fs.readFile(filePath, "utf8");
        let state = JSON.parse(data);

        // Increment the seqno property
        state.seqno++;

        // Write the updated state back to the file
        await fs.writeFile(filePath, JSON.stringify(state));

        // Send the incremented seqno back to the caller
        res.send({ seqno: state.seqno });

        console.log("Successfully incremented seqno");
    }
    catch (error) {
        console.log("Error writing file", error);
        res.status(500).send("Failed to save the file: " + error.message);
    }
});

app.post('/new-face/:filename', async (req, res) => {
    try {
        const fileName = req.params.filename
        const filePath = path.join(dataPath, fileName);
        const emptyPath = path.join(dataPath, "_empty.png");

        await fs.copyFile(emptyPath, filePath);

        console.log('Successfully copied file');
        res.send('Successfully created new face png.');
    }
    catch (error) {
        console.log('Error copying file', error);
        res.status(500).send("Failed to create new face png: " + error.message);
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
