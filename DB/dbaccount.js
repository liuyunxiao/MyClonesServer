/**
 * Created by lyx on 15/6/23.
 */
var mongodbMgr = require('./mongodbMgr');
var mongooseValidateFilter = require('mongoose-validatefilter');
var validate = new mongooseValidateFilter.validate();
var filter = new mongooseValidateFilter.filter();

validate.add('salt',{
    required: true,
    msg: 'salt不能为空'
});

var Schema = mongodbMgr.mongoose.Schema;

var SchemaAccount = new mongodbMgr.mongoose.Schema({
  account: {type:String, index:true, unique:true},
  password: String,
  salt: {type:String, require:true},
  hash: String
});

SchemaAccount.pre('save',function(next){
    next();
});

mongooseValidateFilter.validateFilter(SchemaAccount, validate, filter);

var Account = mongodbMgr.mongoose.model('account', SchemaAccount);

var AccountDAO = function(){};
AccountDAO.prototype.save = function(obj, callback) {
    var instance = new Account(obj);
    instance.save(function(err){
        callback(err);
    });
};

AccountDAO.prototype.findByAccount = function(name, callback) {
    Account.findOne({account:name}, function(err, obj){
        callback(err, obj);
    }).exec();
};

module.exports = new AccountDAO();