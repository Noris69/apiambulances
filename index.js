const mongoose = require('mongoose');
const app = require('./app');

// Connect to MongoDB
const mongoURL = process.env.MONGO_URL || 'mongodb://mongo:27017/ambulanceDB';
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
