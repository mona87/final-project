var User = require('../models/user').User;


exports.index = function(req, res) {
  User.find({}, function(err, docs) {
    if(!err) {
      res.status(200).json({ users: docs });  
    } else {
      res.status(200).json({ message: err });
    }
  });
}

exports.create = function(req, res) {

  var name = req.body.name; // Name of user. 
  var age = req.body.age;  // user age

  //User.findOne({ name: name }, function(err, doc) {  // This line is case sensitive.
  User.findOne({ name: { $regex: new RegExp(name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var user = new User(); 

      user.name = name; 
      user.age = age; 
      // user.date = Date.now();
      
      user.save(function(err) {

        if(!err) {
          res.status(201).json({message: "User created with name: " + user.name });    
        } else {
          res.status(500).json({message: "Could not create user. Error: " + err});
        }

      });

    } else if(!err) {
      
      // User is trying to create a user with a name that already exists. 
      res.status(403).json({message: "User with that name already exists, please update instead of create or create a new user with a different name."}); 

    } else {
      res.status(403).json({ message: err});
    } 
  });

}

exports.update = function(req, res) {
  
  var id = req.body.id; 
  var name = req.body.name;
  var age = req.body.age; 

  User.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = name; 
        doc.age = age; 
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "User updated: " + name});    
          } else {
            res.json(500, {message: "Could not update user. " + err});
          }  
        });
      } else if(!err) {
        res.json(404, { message: "Could not find user."});
      } else {
        res.json(500, { message: "Could not update user." + err});
      }
    }); 
}

exports.delete = function(req, res) {

  var id = req.body.id; 
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.status(200).json({ message: "User removed."});
    } else if(!err) {
      res.status(404).json({ message: "Could not find user."});
    } else {
      res.status(403).json({message: "Could not delete user. " + err });
    }
  });
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the username the user wants to look up. 
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      res.status(200).json(doc);
    } else if(err) {
      res.status(500).json({ message: "Error loading user." + err});
    } else {
      res.status(404).json({ message: "User not found."});
    }
  });
}
