/**
 * Created by lyx on 15/6/30.
 */
/**
 * Created by lyx on 15/6/23.
 */
var mongodbMgr = require('../mongodbMgr');

var Schema = mongodbMgr.mongoose.Schema;

var SchemaAccount = new mongodbMgr.mongoose.Schema({
    account: String,
    password: String,
    salt: String,
    hash: String
});

SchemaAccount.set('autoIndex', false);
SchemaAccount.index({account: 1, type: -1});
module.exports = mongodbMgr.mongoose.model('db_account', SchemaAccount);