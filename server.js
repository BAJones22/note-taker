const express = require('express');
const indexRoute = require('./routes/index.js');
const notesRoute = require('./routes/notes.js');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use('/api/notes', notesRoute);
app.use('/', indexRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

