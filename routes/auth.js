var express = require('express');
var authCtrl = require('../controllers/auth_controller');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', [
    authCtrl.signin
]);

module.exports = router;
