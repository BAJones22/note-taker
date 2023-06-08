const indexRoute = require('express').Router();
const path = require('path');

indexRoute.get("/notes", (req, res) => 
res.sendFile(path.join(__dirname, "..", "Develop", "public", "notes.html"))
);

indexRoute.get("*", (req, res) => 
res.sendFile(path.join(__dirname, "..", "develop", "public", "index.html"))
);


module.exports = indexRoute;
