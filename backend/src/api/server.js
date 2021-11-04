require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_URL, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }, (error) => {
    if (error)
      console.log(error)
    else
      console.log('Mongo Connected')
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running`))