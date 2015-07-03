/**
 * Created by lyx on 15/7/3.
 */
var express = require('express');
var router = express.Router();
var hash = require('../pass').hash;
var dbCurd = require('../DB/dbcurd');
var co = require('co');
formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/avatar/'
var uuid = require('node-uuid');

//按类型获得动态
router.post('/changeHeadPic', function(req, res, next) {
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
        checkUser(dbUser);

        var upLoadPic = function(){
            return new Promise(function(resolve, reject){
                var form = new formidable.IncomingForm();   //创建上传表单
                form.encoding = 'utf-8';        //设置编辑
                form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
                form.keepExtensions = true;     //保留后缀
                form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
                form.parse(req, function(err, fields, files) {
                    if (err)
                        reject(new Error('图片解析错误，请重新上传'));
                    else{
                        resolve(files.file.path);
                    }
                })
            });
        }

        var picPath = yield upLoadPic();
        return yield dbCurd.update('db_user', {_id:dbUser._id}, {headPic: picPath});
    }).then(function(data) {
        res.json({resultCode:'0'});
    }, function(err) {
        res.json({resultCode:'1', resultMsg:err.message});
    });

});

module.exports = router;