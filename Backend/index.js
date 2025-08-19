const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Router = require('./routes/routes.js');
const cors = require('cors');
const uri = 'mongodb+srv://chrisladlu1001:admin@bykonzdb.jysuqkg.mongodb.net/?retryWrites=true&w=majority&appName=Bykonzdb';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect(uri)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.use('/', Router);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});