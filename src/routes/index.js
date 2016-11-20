var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var accommodations = require("../controllers/accommodationController");
var users = require("../controllers/userController");
var login = require('../controllers/loginController');
var Upload = require('../models/upload');
var User = require("../models/user");
// var uploads = require("../controllers/uploadController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/accommodation", accommodations.addAccommodation);
router.get("/accommodationlist", accommodations.getAccommodationList);
router.get("/accommodation/:id", accommodations.getAccommodation);
router.get("/user/:id", users.getUser); // used query parameter
router.post("/user", users.addUser);
router.post("/user/passwordchange", users.changePassword);
router.post("/login", login.login);

// router.put("/user", function updateUser(req, res) {
router.post("/user/update", function updateUser(req, res) {
  console.log("Update User started");
  var user = req.body.user;
  user.avatar = "public/uploads/images/" + user.avataroriginal;
  var query = {'_id': user._id};
  // req.newData = req.user;
  // User.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
  User.findOneAndUpdate(query, user, function (err, user) {
    if (err)
      return res.send(500, { error: err });
    if (user)
      user = user;
  });
  // Rename avatar file on system
  var originalFileName = user.avataroriginal;
  var res;
  Upload.findOne({originalname: originalFileName}, function (err, doc) {
    if (err) return res.send(500, {error: err});
    if (doc) {
      var fullPath = doc.storagename;
      var storagedFileName = fullPath.replace(/^.*[\\\/]/, '');
      // var filename = /[^\/]*$/;
      // var path = fullPath.replace(filename, '');
      var dirname = fullPath.match(/(.*)[\/\\]/)[1]||'';
      var renamedFile = path.join(dirname, originalFileName)
      fs.rename(fullPath, renamedFile, function (err) {
        if (err) throw err;
        fs.stat(renamedFile, function (err, stats) {
          if (err) throw err;
          console.log('stats: ' + JSON.stringify(stats));
        });
      });
      // Delete Upload Record
      Upload.remove({ originalname: originalFileName }, function(err) {
        if (err) {
          console.log("Upload Delete Error:")
          console.log(err);
          return res.status(500).send({error: 'Upload delete failed.'});
        }
      });
    }
  })
})



module.exports = router;
