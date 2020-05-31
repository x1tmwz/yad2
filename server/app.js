const express = require('express');
require('dotenv').config();
require('./db/mongoose');
const path = require('path');
const userRouter = require('./routers/user');
const adRouter = require('./routers/ad');
const cors =require('cors');
const publicPath = path.join(__dirname, '../yad2client','build');
const app = express();
app.use(express.static(publicPath));
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(userRouter);
app.use(adRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });



module.exports = app;

