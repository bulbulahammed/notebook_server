const express = require('express');
const app = express();
const notes = require("./data/data");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
var cors = require('cors')
app.use(cors());


// Apply Json
app.use(express.json());


const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rgpko6r.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url,{
})
.then(()=> console.log('Database connection established'))
.catch(err => console.log(err));



app.get('/', (req, res) => {
  res.send('Hello, From Notebook Server! ✌')
});

// TODO: Remove after test
// app.get("/api/notes",(req,res)=>{
//   res.json(notes);
// })

// Creating Route for users
app.use('/api/users',userRoutes);
// Creating Route for notes
app.use('/api/notes',noteRoutes);

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;