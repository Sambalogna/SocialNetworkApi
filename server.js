const express = require('express');
const db = require('./config/connection');
// Require model
const { User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates a new document
app.post('/newUser/:user', (req, res) => {
  const newUser= new User({ name: req.params.user });
  // The .save() is an instance method of the model, while the .create() is called directly from the Model as a method call, being static in nature, and takes the object as a first parameter.
  // https://mongoosejs.com/docs/models.html#constructing-documents
  newUser.save();
  // OR
  // Genre.create({ size: 'small' }, function (err, newGenre) {
  // if (err) { ;
  //   console.log('Uh Oh, something went wrong');
  //   res.status(500).json({ message: 'something went wrong' });
  //   }else{
  //     res.status(200).json(newGenre);
  //   };
  if (newUser) {
    res.status(200).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds all documents
app.get('/all-users', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// Find first document with name equal to "Kids"
app.get('/finduser', (req, res) => {
  User.findOne({ name: 'Kids' }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// Finds first document that matches and deletes
app.delete('/find-one-delete/:user', (req, res) => {
  User.findOneAndDelete({ name: req.params.user }, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// Finds the first document with the name with the value equal to 'Kids' and updates that name to the provided URL param value
app.put('/find-one-update/:user', (req, res) => {
  // Uses findOneAndUpdate() method on model
  Genre.findOneAndUpdate(
    // Finds first document with name of "Kids"
    { name: 'Kids' },
    // Replaces name with value in URL param
    { name: req.params.user },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    }
  );
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
