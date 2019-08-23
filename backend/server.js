import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();

const dbUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

const validate = data => {
  let errors = {};
  if (data.title === '') errors.title = "Can't be empty";
  if (data.statuss === '') errors.statuss = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
};

mongodb.MongoClient.connect(dbUrl, (err, db) =>  {
  
  if (err) {
    throw new Error(err);
  }

  app.get('/api', (req, res) => {
    db.collection('todos').find({}).toArray((err, todos) => {
      res.json({ todos });
    });
  });

  app.post('/api', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { title, statuss } = req.body;
      db.collection('todos').insert({ title, statuss }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ todo: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });

  app.put('/api/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { title, statuss } = req.body;
      db.collection('todos').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: { title, statuss } },
        { returnOriginal: false },
        (err, result) => {
          if (err) { res.status(500).json({ errors: { global: err }}); return; }

          res.json({ todo: result.value });
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

  app.get('/api/:_id', (req, res) => {
    db.collection('todos').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, todo) => {
      res.json({ todo });
    })
  });

  app.delete('/api/:_id', (req, res) => {
    db.collection('todos').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
      if (err) { res.status(500).json({ errors: { global: err }}); return; }

      res.json({});
    })
  });

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Still working on it."
      }
    });
  });

  app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

});
