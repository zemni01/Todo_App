const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3030;
const app = express();
const toDoRoutes = require('./routes/toDoRoutes');
const authRoute = require('./routes/auth');

app.use(express.json());
app.use(cors());
app.use(authRoute);


mongoose.connect("mongodb://localhost/todolist")
    .then(() => console.log("connected to database"))
    .catch((err) => console.error(err));

app.use('/todos', toDoRoutes);
app.use('/login', authRoute);

app.listen(PORT, () => {
    console.log('server is listening on port : ' + PORT);
});