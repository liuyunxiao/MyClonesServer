/**
 * Created by lyx on 15/6/23.
 */
var mongodbMgr = require('./mongodbMgr');

var Schema = mongodbMgr.mongoose.Schema;

var SchemaAccount = new mongodbMgr.mongoose.Schema({
  account: String,
  password: String,
  salt: String,
  hash: String
});

var Account = mongodbMgr.mongoose.model('account', SchemaAccount);

var AccountDAO = function(){};
AccountDAO.prototype.save = function(obj, callback) {
    var instance = new Account(obj);
    instance.save(function(err){
        callback(err);
    });
};

AccountDAO.prototype.findByAccount = function(name, callback) {
    Account.find({account:name}, function(err, obj){
        callback(err, obj);
    });
};

AccountDAO.prototype.countByAccount = function(name, callback){
    Account.count({account: name}, function(err, count)
    {
        callback(err, count);
    });
};
module.exports = new AccountDAO();