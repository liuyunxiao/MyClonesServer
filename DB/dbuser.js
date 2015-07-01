/**
 * Created by lyx on 15/6/29.
 */
/**
 * Created by lyx on 15/6/23.
 */
var mongodbMgr = require('./mongodbMgr');

var Schema = mongodbMgr.mongoose.Schema;

var SchemaUser = new mongodbMgr.mongoose.Schema({
    accountId: String,
    headPic: String,
    nickname: String,
    sex: Number,
    age: Number,
    sign: String,
    name: String,
    cardId: String,
    phone: String
});

var User = mongodbMgr.mongoose.model('user', SchemaUser);

var UserDAO = function(){};
UserDAO.prototype.save = function(obj, callback) {
    var instance = new User(obj);
    instance.save(function(err){
        callback(err);
    });
};

UserDAO.prototype.findByAccount = function(index, callback) {
    User.findOne({accountId:index}, function(err, obj){
        callback(err, obj);
    });
};

module.exports = new UserDAO();