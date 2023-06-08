const express = require('express');
const indexRoutes = require('express').Router();
const path = require('path');

indexRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

indexRoutes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = indexRoutes;