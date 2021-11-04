const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taksRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', userRouter);
app.use('/', taskRouter);

module.exports = app;