const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3030;
const app = express();
const toDoRoutes = require('./routes/toDoRoutes');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/todolist")
    .then(() => console.log("connected to database"))
    .catch((err) => console.error(err));

app.use('/todos', toDoRoutes);

app.listen(PORT, () => {
    console.log('server is listening on port : ' + PORT);
});