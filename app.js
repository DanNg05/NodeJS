const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');



const app = express();
const PORT = 5000 || process.env.PORT;


// connect to DB
connectDB();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/css')));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts')));


// register view engine
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main')
// app.set('view', path.join(__dirname, 'views/mains'));


app.use('/', require('./server/routes/main'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
