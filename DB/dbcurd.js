/**
 * Created by lyx on 15/6/30.
 */

var mongodbMgr = require('./mongodbMgr');

exports.save = function(modelname, data) {
    var promise = new mongodbMgr.mongoose.Promise();
    var model = require('./db_model/' + modelname);
    var instance = new model(data);
    instance.save(function(err){
        promise.resolve(err);
    });
    return promise;
};

exports.insert = function(modelname, data) {
    var promise = new mongodbMgr.mongoose.Promise();
    var model = require('./db_model/' + modelname);
    model.create(data, function(err, doc){
        promise.resolve(err, doc);
    });
    return promise;
};

//Model.remove = function remove (conditions, callback) {
exports.remove = function(modelname, conditions, callback) {
    var promise = new mongodbMgr.mongoose.Promise();
    var model = require('./db_model/' + modelname);
    model.remove(conditions, function(err, doc) {
        promise.resolve(err, doc);
    });

    return promise;
};


//Model.update = function update (conditions, doc, options, callback) {
//doc new documents
//
//Valid options:
//safe (boolean) safe mode (defaults to value set in schema (true))
//upsert (boolean) whether to create the doc if it doesn't match (false)
//multi (boolean) whether multiple documents should be updated (false)
//strict (boolean) overrides the strict option for this update
//overwrite (boolean) disables update-only mode, allowing you to overwrite the doc (false)

exports.update = function(modelname, conditions, doc, options, callback) {
    var promise = new mongodbMgr.mongoose.Promise();
    var model = require('./db_model/' + modelname);
    var options = {};
    model.update(conditions, doc, options, function(err, doc) {
        promise.resolve(err, doc);
    });
    return promise;
};


//  Model.find(match, select, options.options, function (err, vals)
//Model.find = function find (conditions, fields, options, callback)
exports.find = function(modelname, data) {
    var promise = new mongodbMgr.mongoose.Promise();
    var model = require('./db_model/' + modelname);
    model.find(data, function(err, doc) {
        promise.resolve(err, doc);
    });
    return promise;
};

/**
 * @param {Object} conditions
 * @param {Object} [fields] optional fields to select
 * @param {Object} [options] optional
 * @param {Function} [callback]
 * @return {Query}
 * @see field selection #query_Query-select
 * @see promise #promise-js
 * @api public
 */
exports.find = function find (modelname,conditions, fields, options, callback) {
    var model = require('./db_model/' + modelname);
    var promise = new mongodbMgr.mongoose.Promise();
    model.find(conditions, fields, options,function (err, doc){
        promise.resolve(err, doc);
    });
    return promise;
};

//Model.findById = function findById (id, fields, options, callback) {
//  return this.findOne({ _id: id }, fields, options, callback);
//};
exports.findOne = function(modelname, fields, options, callback){
    var promise = new mongodbMgr.mongoose.Promise();
    var model = require('./db_model/' + modelname);
    model.findOne(fields, function(err, doc) {
        promise.resolve(err, doc);
    });
    return promise;
};



//Model.findOneAndUpdate = function (conditions, update, options, callback)
exports.findOneAndUpdate = function(modelname, conditions, update, options, callback){
    var promise = new mongodbMgr.mongoose.Promise();
    var model = require('./db_model/' + modelname);
    model.findOneAndUpdate(conditions, update, options, function(err, doc) {
        promise.resolve(err, doc);
//       this.callback.apply();
    });
    return promise;
};