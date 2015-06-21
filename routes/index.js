var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/log', function(req, res, next) {
  res.render('index', { title: 'ddd' });
});

module.exports = router;
