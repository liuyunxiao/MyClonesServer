/**
 * Created by lyx on 15/6/21.
 */
var express = require('express');
var router = express.Router();
var hash = require('../pass').hash;
var dbCurd = require('../DB/dbcurd');
var co = require('co');

//登录
router.post('/login', function(req, res, next) {
    co(function* (){
        var dbAccount = yield dbCurd.findOne('db_account', {account:req.body.account});
        var checkAccount = function(account){
            return new Promise(function(resolve, reject) {
                if(!account)
                    reject(new Error('账号不存在'));
                else{
                    hash(req.body.password, account.salt, function (err, hash) {
                        if (err)
                            reject(new Error('异常'));
                        else {
                            if (hash != account.hash)
                                reject(new Error('账号或密码错误'));
                            else
                                resolve(account);
                        }
                    });
                }
            });
        }
        yield checkAccount(dbAccount);

        var dbUser = yield dbCurd.findOne('db_user', {_id:dbAccount.userId});
        var checkUser = function(user){
            return new Promise(function(resolve, reject) {
                if(!user)
                    reject(new Error('用户不存在'));
                else
                    resolve(user);
            });
        }

        yield checkUser(dbUser);

        var retData = {
            resultCode: 0,
            userId: dbUser._id,
            headPic: dbUser.headPic,
            nickName: dbUser.nickName,
            sex: dbUser.sex,
            age: dbUser.age,
            name: dbUser.name,
            cardId: dbUser.cardId,
            phone: dbUser.phone,
            account: dbAccount.account,
            password: dbAccount.password
        };
        var sessionData ={
            userId:dbUser._id
        };
        req.session.userData = sessionData;
        return retData;
    }).then(function(data) {

        res.json(data);
        console.log(data);
        console.log(retData);
    }, function(err) {
        res.json({resultCode:'1', resultMsg:err.message});
        console.log(err.message);
    });
});

//检查账号是否存在
router.post('/checkAccount', function(req, res, next) {
    co(function* (){
        var dbAccount = yield dbCurd.findOne('db_account', {account:req.body.account});
        var checkAccount = function(account) {
            return new Promise(function (resolve, reject) {
                if (account)
                    reject(new Error('账号已存在'));
                else
                    resolve(account);
            })
        }
        return yield checkAccount(dbAccount);
    }).then(function(data) {
        res.json({resultCode:0});
        console.log(data);
        console.log(retData);
    }, function(err) {
        res.json({resultCode:'1', resultMsg:err.message});
        console.log(err.message);
        console.log(retData);
    });
});

//注册账号
router.post('/register', function(req, res, next) {
    if(!req.body.account || req.body.account == undefined) {
        res.json({resultCode:'1', resultMsg:'账号不能为空'});
        return;
    }

    co(function* (){
        var dbAccount = yield dbCurd.findOne('db_account', {account:req.body.account});
        var checkAccount = function(account, saveData) {
            return new Promise(function (resolve, reject) {
                if (account)
                    reject(new Error('账号已存在'));
                else {
                    hash(saveData.password, function (err, salt, hash) {
                        if (err)
                            reject(new Error('异常'));
                        else{
                            saveData.salt = salt;
                            saveData.hash = hash;
                            resolve(saveData);
                        }
                    });
                }
            })
        }
        var saveData = {
            account: req.body.account,
            password: req.body.password
        };
        var saveHashData = yield checkAccount(dbAccount, saveData);

        var dbAccount = yield dbCurd.insert('db_account', saveHashData);
        var saveUserData = {
            accountId: dbAccount._id
        };
        var dbUser = yield dbCurd.insert('db_user', saveUserData);
        //var retData = {
        //    headPic: 'test2.jpg',
        //    nickName: '星星',
        //    sex: 0,
        //    age: 20,
        //    name: 'J联赛',
        //    cardId: '42432432423',
        //    phone: '13211123'
        //};
        //yield dbCurd.update('db_user', {_id:dbUser._id}, retData);
        return yield dbCurd.update('db_account', {_id:dbAccount._id}, {userId: dbUser._id});
    }).then(function(data) {
        res.json({resultCode:0});
        console.log(data);
    }, function(err) {
        res.json({resultCode:'1', resultMsg:err.message});
        console.log(err.message);
    });
});


module.exports = router;

