/**
 * Created by lyx on 15/6/23.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myclones');

exports.mongoose = mongoose;