/**
 * Created by lyx on 15/6/21.
 */
var express = require('express');
var router = express.Router();
var DBAccount = require('../DB/dbaccount');

/* GET home page. */
router.post('/login', function(req, res, next) {
    //req.session.islogin = 'success';
    //res.locals.islogin = req.session.islogin;

    var retData = {
        resultCode: 0,
        resultMsg: ""
    };
    var saveData = {
        account: req.body.account,
        password: req.body.password,
        salt: "fjldsjfl",
        hash: "fjdjk"
    };

    DBAccount.countByAccount(req.body.account, function(err, count){
        if(count == 0)
        {
            DBAccount.save(saveData, function(err){
                if(err)
                {
                    retData.resultCode = 1;
                    retData.resultMsg = "保存数据库出错";
                    res.send(JSON.stringify(retData));
                }
                else
                {
                    res.send(JSON.stringify(retData));
                }
            });
        }
        else
        {
            retData.resultCode = 1;
            retData.resultMsg = "账号已存在";
            res.send(JSON.stringify(retData));
        }
    });



    console.log(req.session);
});

router.post('/register', function(req, res, next) {
    //res.render('index', { title: 'Express' });

    req.session.islogin = 'success';
    req.locals.islogin = req.session.islogin;

    //res.locals.ff = 'jfldjslj';
    var st = req.body.mphone;
    console.log(st);
});


module.exports = router;

