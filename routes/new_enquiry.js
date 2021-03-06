var express = require('express');
var router = express.Router();

// var enquiryCtrl = require('../controllers/enquiry_controller');
var EnquiryController = require('../controllers/new_enquiry_controller');
var enquiryCtrl = new EnquiryController();
var authCntrl = require('../controllers/auth_controller');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });

router.get('/', [
    authCntrl.verifyToken,
    enquiryCtrl.fetchAll
]);

// router.get('/:id', [
//     enquiryCtrl.fetchById
// ]);

// router.post('/', [
//     enquiryCtrl.insert
// ]);

// router.put('/:id', [
//     enquiryCtrl.update
// ]);

// router.delete('/:id', [
//     enquiryCtrl.hardDelete
// ]);

// router.delete("/softdelete/:id", [
//     enquiryCtrl.softDelete
// ]);

module.exports = router;
