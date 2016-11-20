/**
 * Created by Peter on 21.08.2016.
 */
"use strict";
import mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
import Accommodation = require("../models/accommodation");
//import repository = acoommodationModel.repository;

export function addAccommodation(req, res) {
    console.log("XXX")
    
    var title = req.body.accommodation.title;
    console.log(title);
    var description_short = req.body.accommodation.description_short;
    console.log(description_short);
    var image = req.body.accommodation.image;
    console.log(image);
    var type = req.body.accommodation.type;
    console.log(type);
    let accommodation = new Accommodation()
    accommodation._id = ObjectId();
    accommodation.title = title;
    accommodation.description_short=description_short;
    accommodation.image = image;
    accommodation.type = type;
    accommodation.save(function (err, accommodation) {
        if (err) return console.error(err);
        return res.json(accommodation);
    });
    console.log("one accommodation saved")
    
}

export function getAccommodation(req, res) {
    console.log("Get Accommodation Request");
    var id = req.params.id;
    console.log(typeof(id));
    console.log("Accommodation Id: " + id);
    var idObj = ObjectId(id);
    console.log(typeof(id));
    console.log("Accommodation Id: " + id.valueOf());
    Accommodation.findById(idObj, function (err, doc) {
        if (err) {
            // return res.send('Error');
            console.log(err);
            // return next(err);
        }
       if (doc) {
            let accommodation = doc;
            console.log("Accommodation found");
            res.json(accommodation);
            console.log(accommodation);
        }
       else {
           console.log("No found");
           console.log(doc);

       }

    });
}

export function getAccommodationList(req, res) {
    console.log("try to find accommodations")
    Accommodation.find(function (err, accommodations) {
        if (err) {
            console.log(err);
            return res.send('err');
        }
        
        console.log(accommodations);
        return res.json(accommodations);
    });
}
