/**
 * Created by Peter on 11.09.2016.
 */
"use strict";
//import * as mongoose from 'mongoose';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var accommodationSchema = new Schema({
    _id: Schema.ObjectId,
    title: String,
    description_short: String,
    image: String,
    type: String
});
// Create a model based on the schema
var Accommodation = mongoose.model("Accommodation", accommodationSchema);
module.exports = Accommodation;
//# sourceMappingURL=accommodation.js.map