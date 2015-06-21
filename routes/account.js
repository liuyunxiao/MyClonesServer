/**
 * Created by lyx on 15/6/21.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
    //res.render('index', { title: 'Express' });

    //req.session.islogin = 'success';
    //req.locals.islogin = req.session.islogin;

    //res.locals.ff = 'jfldjslj';
    //console.log(req);
    //var st = req.body.mphone;
    //res.locals.resultCode = 0;
    //res.locals.

    var data = {
        resultCode: 0,
    };

    var str = JSON.stringify(data);
    console.log(str);
    res.send(str);

    //console.log(res);
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

