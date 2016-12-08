/**
 * Created by Peter on 21.08.2016.
 */
"use strict";
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Accommodation = require("../models/accommodation");
//import repository = acoommodationModel.repository;
function addAccommodation(req, res) {
    console.log("XXX");
    var title = req.body.accommodation.title;
    var description_short = req.body.accommodation.description_short;
    var image = req.body.accommodation.image;
    var type = req.body.accommodation.type;
    console.log(type);
    var accommodation = new Accommodation();
    accommodation._id = ObjectId();
    accommodation.title = title;
    accommodation.description_short = description_short;
    accommodation.image = image;
    accommodation.type = type;
    accommodation.save(function (err, accommodation) {
        if (err)
            return console.error(err);
        return res.json(accommodation);
    });
}
exports.addAccommodation = addAccommodation;
function getAccommodation(req, res) {
    var id = req.params.id;
    var idObj = ObjectId(id);
    Accommodation.findById(idObj, function (err, doc) {
        if (err) {
            // return res.send('Error');
            console.log(err);
        }
        if (doc) {
            var accommodation = doc;
            res.json(accommodation);
        }
        else {
            console.log("No found");
            console.log(doc);
        }
    });
}
exports.getAccommodation = getAccommodation;
function getAccommodationList(req, res) {
    Accommodation.find(function (err, accommodations) {
        if (err) {
            return res.send('err');
        }
        return res.json(accommodations);
    });
}
exports.getAccommodationList = getAccommodationList;
//# sourceMappingURL=accommodationController.js.map