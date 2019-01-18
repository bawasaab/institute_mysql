var express = require('express');
var router = express.Router();

var enquiryCtrl = require('../controllers/enquiry_controller');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });

router.get('/', [
    enquiryCtrl.fetchAll
]);

router.get('/:id', [
    enquiryCtrl.fetchById
]);

router.post('/', [
    enquiryCtrl.insert
]);

router.put('/:id', [
    enquiryCtrl.update
]);

router.delete('/:id', [
    enquiryCtrl.hardDelete
]);

router.delete("/softdelete/:1d", [
    enquiryCtrl.softDelete
]);

module.exports = router;
