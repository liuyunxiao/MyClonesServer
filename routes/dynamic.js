/**
 * Created by lyx on 15/7/2.
 */
var express = require('express');
var router = express.Router();
var hash = require('../pass').hash;
var dbCurd = require('../DB/dbcurd');
var co = require('co');

//按类型获得动态
router.post('/queryDynamicByType', function(req, res, next) {
    co(function* (){
        var dbUser = yield dbCurd.findOne('db_user', {_id:req.session.userData.userId});
        var checkUser = function(user){
            return new Promise(function(resolve, reject) {
                if(!user)
                    reject(new Error('用户不存在'));
                else
                    resolve(user);
            });
        }
        return yield checkUser(dbUser);
    }).then(function(data) {
        //var retData = {
        //    resultCode: 0,
        //    headPic: data.headPic,
        //    nickName: data.nickName,
        //    sex: data.sex,
        //    age: data.age,
        //    name: data.name,
        //    cardId: data.cardId,
        //    phone: data.phone
        //};
        //res.json(retData);
        res.json({resultCode:'0'});
        console.log(data);
        console.log(retData);
    }, function(err) {
        res.json({resultCode:'1', resultMsg:err.message});
        console.log(err.message);
    });
});

module.exports = router;