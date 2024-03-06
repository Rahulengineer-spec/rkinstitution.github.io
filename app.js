const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to your desired port

// Connect to MongoDB
mongoose.connect('mongodb+srv://rkinstitution:Ardentian1995*@ardentian.skkkdsn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Check for successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Check for connection errors
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Create a schema for the registration data
const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  className: String,
  course: String,
  phoneNumber: String
});

// Create a model based on the schema
const Registration = mongoose.model('Registration', registrationSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, gender, className, course, phoneNumber } = req.body;

  // Create a new registration document
  const registration = new Registration({
    firstName,
    lastName,
    email,
    gender,
    className,
    course,
    phoneNumber
  });

  try {
    // Save the document to the database using await
    await registration.save();
    res.send('Registration successful!');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
