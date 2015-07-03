/**
 * Created by lyx on 15/7/2.
 */
var mongodbMgr = require('../mongodbMgr');

var Schema = mongodbMgr.mongoose.Schema;

var SchemaUser = new mongodbMgr.mongoose.Schema({
    accountId: String,
    headPic: String,
    nickName: String,
    sex: Number,
    age: Number,
    name: String,
    cardId: String,
    phone: String,
    token: String
});

module.exports  = mongodbMgr.mongoose.model('db_user', SchemaUser);