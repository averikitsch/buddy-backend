const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  provider: {
    type: String,
  },
  LogList: Array,
  WishList: Array, //[logSchema]
});

User = mongoose.model('user', userSchema);

mongoose.connect(process.env.MONGO_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

const get_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user)
  })
}

const get_all = function(req, res) {
  User.find(function(err, users){
    if(err) {
        res.status(500).send({message: "Some error occurred while retrieving notes."});
    } else {
        res.send(users);
    }
  })
}

const create_user = function(req, res) {
  const new_user = new User(req.body); //{username: req.body.username, userId: req.body.userId}
  new_user.save( function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user);
  });
};

const update_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, {$set:{LogList: req.body.LogList, WishList: req.body.WishList}}, {new: true}, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

const find_user = function(req, res) {
  User.find({userId: req.body.userId}, function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user[0])
  })
}
//
// const user = require('./user_controllers');

const app = express();

  app.use(bodyParser.json()) // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
  app.route('/users/provider/:provider')
    .post(find_user);

  app.route('/users/:userId')
    .get(get_user)
    .put(update_user);

  app.route('/users')
    .get(get_all)
    .post(create_user);



  app.use(express.static(__dirname + '/'))
  app.listen(process.env.PORT || 5000);
