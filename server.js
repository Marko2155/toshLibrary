const express = require("express")
const publicFolder = __dirname + "/public"
const fs = require("fs")
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, publicFolder + "/projects")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
const port = 8080
const app = express()

app.use(express.static(publicFolder))

// API v1
app.post("/api/v1/upload", upload.single("sb2File"), function(req, res) {
    res.sendFile(__dirname + "/filesuccessfullyuploaded.html")
})


app.get("/api/v1/projects", async function(req, res) {
    const files = fs.readdirSync(publicFolder + "/projects")
    res.json({ files: files })
})

// Links

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get("/projects", function(req, res) {
    res.sendFile(__dirname + "/projects.html")
})

app.get("/upload", function(req, res) {
    res.sendFile(__dirname + "/upload.html")
})

// Server

app.listen(port, function(err) {
    if (err) throw err
    console.log(`toshLibrary listening on port ${port}`)
})
