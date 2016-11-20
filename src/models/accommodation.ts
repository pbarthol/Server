/**
 * Created by Peter on 11.09.2016.
 */
"use strict";
//import * as mongoose from 'mongoose';
import mongoose = require('mongoose');
let Schema = mongoose.Schema;

let accommodationSchema = new Schema({
    _id: Schema.ObjectId,
    title: String,
    description_short: String,
    image: String,
    type: String
});

// Create a model based on the schema
let Accommodation = mongoose.model("Accommodation", accommodationSchema);
export = Accommodation;
