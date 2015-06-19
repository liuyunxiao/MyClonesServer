/**
 * Created by lyx on 15/6/19.
 */
/**
 * Created by lyx on 15/6/19.
 */
/**
 * Created by lyx on 15/6/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });

    req.session.islogin = 'success';
    req.locals.islogin = req.session.islogin;

    //res.locals.ff = 'jfldjslj';
    var st = req.body.mphone;
    console.log(st);
});

module.exports = router;
