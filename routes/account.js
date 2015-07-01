/**
 * Created by lyx on 15/6/21.
 */
var express = require('express');
var router = express.Router();
var dbAccount = require('../DB/dbaccount');
var dbUser = require('../DB/dbuser');
var hash = require('../pass').hash;
var dbCurd = require('../DB/dbcurd');
var co = require('co');



/* GET home page. */
router.post('/login', function(req, res, next) {
    var retData = {
        resultCode: 0,
        resultMsg: ""
    };

    co(function* (){
        var data = yield dbCurd.findOne('db_account', {account:req.body.account});
        var checkLogin = function(data) {
            return new Promise(function(resolve, reject) {
                if(!data) {
                    reject(new Error('账号不存在'));
                }
                else {
                    hash(req.body.password, data.salt, function(err, hash) {
                        if(err) {
                            reject(new Error('异常'));
                        }
                        else {
                            if(hash == data.hash) {
                                resolve(data);
                            }
                            else {
                                reject(new Error('账号或密码错误'));
                            }
                        }
                    })
                }

            })
        }
        return yield checkLogin(data);
    }).then(function(data)
    {
        retData.resultCode = 0;
        res.send(JSON.stringify(retData));
        if(data)
        {
            console.log(data);
        }
    }, function(error)
    {
        if(error)
        {
            retData.resultCode = 1;
            retData.resultMsg = error.message;
            res.send(JSON.stringify(retData));
            console.log(error.message);
        }
    });
});

router.post('/checkaccount', function(req, res, next) {

});



router.post('/register', function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;

    var retData = {
        resultCode: 0,
        resultMsg: ""
    };

    if(account == null ) {
        retData.resultCode = 1;
        retData.resultMsg = "账号不能为空";
        res.send(JSON.stringify(retData));
        return;
    }

    co(function* (){
        var accountData = yield dbCurd.findOne('db_account', {account:req.body.account});
        var saveData = {
            account: req.body.account,
            password: req.body.password
        };
        var checkRegister = function(accountData, saveData) {
            return new Promise(function (resolve, reject) {
                if (accountData) reject(new Error('账号已存在'));
                else {
                    hash(saveData.password, function (err, salt, hash) {
                        if (err) {
                            reject(new Error('异常'));
                        }
                        else{
                            saveData.salt = salt;
                            saveData.hash = hash;
                            resolve(saveData);
                        }
                    });
                }

            })
        }

        var saveHashData =  yield checkRegister(accountData, saveData);
        return yield dbCurd.insert('db_account', saveHashData);
    }).then(function(data) {
        retData.resultCode = 0;
        res.send(JSON.stringify(retData));
        if(data)
        {
            console.log(data);
        }
    }, function(error) {
        if(error)
        {
            retData.resultCode = 1;
            retData.resultMsg = error.message;
            res.send(JSON.stringify(retData));
            console.log(error.message);
        }
    });
});


module.exports = router;

