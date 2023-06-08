const express = require('express');
const indexRoutes = require('./routes/index');
const notesRoutes = require('./routes/notes');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/', 'indexRoutes');
app.use('/api/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});