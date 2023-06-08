const indexRoute = require('express').Router();
const path = require('path');

indexRoute.get("/notes", (req, res) => 
res.sendFile(path.join(__dirname, "..", "assets", "notes.html"))
);

indexRoute.get("*", (req, res) => 
res.sendFile(path.join(__dirname, "..", "assets", "index.html"))
);


module.exports = indexRoute;
