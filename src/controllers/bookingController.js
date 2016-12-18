"use strict";
/**
 * Created by Peter on 06.12.2016.
 */
var mongoose = require('mongoose');
var Booking = require("../models/booking");
var moment = require('moment');
var ObjectId = mongoose.Types.ObjectId;
function addBooking(req, res) {
    console.log(req.body);
    console.log(req.body.booking);
    var booking = req.body.booking;
    var newBooking = new Booking();
    newBooking.userid = booking.user_id;
    newBooking.accommodationid = booking.accommodation_id;
    newBooking.datefrom = booking.from_date;
    newBooking.dateto = booking.to_date;
    console.log(newBooking);
    Booking.findOne({ userid: newBooking.user_id,
        accommodationid: newBooking.accommodation_id,
        datefrom: newBooking.from_date,
        dateto: newBooking.to_date }, function (err, booking) {
        if (err) {
            console.log(err);
            // return res.status(500).send({success: false, msg: 'Error at search the booking.'});
            return res.status(500).send({ error: 'Error at search the booking.' });
        }
        if (!booking) {
            // append date stamp when record was created //
            newBooking.createddate = moment().format();
            newBooking._id = ObjectId();
            newBooking.save(function (err, booking) {
                if (err) {
                    console.log(err);
                    // return res.status(500).send({success: false, msg: 'Booking save() failed.'});
                    return res.status(500).send({ error: 'Booking save() failed.' });
                }
                return res.json(booking);
            });
        }
        else {
            console.log('The accommodation is already booked for this user.');
            // return res.status(500).send({success: false, msg: 'The accommodation is already booked for this user'});
            return res.status(500).send({ error: 'The accommodation is already booked for this user.' });
        }
    });
}
exports.addBooking = addBooking;
function getBooking(req, res) {
    console.log('get Booking Request');
    var id = req.params.id;
    var idObj = ObjectId(id);
    // console.log(typeof(id));
    // console.log("Booking Id: " + id.valueOf());
    Booking.findById(idObj, function (err, doc) {
        if (err) {
            // return res.send('Error');
            console.log(err);
        }
        if (doc) {
            var booking = doc;
            console.log("Booking found");
            res.json(booking);
            console.log(booking);
        }
        else {
            console.log("No found");
            console.log(doc);
        }
    });
}
exports.getBooking = getBooking;
function getAllBookings(req, res) {
    Booking.find(function (err, bookings) {
        if (err) {
            return res.status(500).send({ error: 'Failure in getAllBookings.' });
        }
        if (bookings) {
            return res.json(bookings);
        }
    });
}
exports.getAllBookings = getAllBookings;
function getBookingsForUser(req, res) {
    console.log('get Booking Request');
    var userid = req.params.id;
    Booking.find({ userid: userid }, function (err, bookings) {
        if (err) {
            return res.status(500).send({ error: 'Failure in getBookingsForUser.' });
        }
        if (bookings) {
            return res.json(bookings);
        }
    });
}
exports.getBookingsForUser = getBookingsForUser;
//# sourceMappingURL=bookingController.js.map