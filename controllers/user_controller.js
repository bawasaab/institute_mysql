var express = require('express');
const jwt = require('jsonwebtoken');
var User = require('../models').User;
var CommonCntrl = require('./common_controller');

var config = {};

config.err_messages = {
    'firstName': "First Name",
    'lastName': "Last Name",
    'fatherName': "Father Name",
    'enqDate': "User Date",
    'courseId': "Course Id"
};

config.expected_keys = [
    'firstName',
    'lastName',
    'fatherName',
    'enqDate',
    'courseId',
    'remarks',
    'status'
];

config.not_null_keys = [
    'firstName',
    'lastName',
    'fatherName',
    'courseId'

];

config.required_keys = [
    'firstName',
    'lastName',
    'fatherName',
    'enqDate',
    'courseId'


];

var CommonCntrl_obj = new CommonCntrl(config);

var insert = (req, res, next) => {

    var in_data = {};
    in_data = CommonCntrl_obj.check_inputs(req.body, true);
    
    if (in_data.err.length > 0) {

        res.status(200).send({ in_data });
    } else if ((typeof in_data.err.err != "undefined") && (in_data.err.err.length > 0)) {

        res.status(200).send({ in_data });
    } else {

        User.build(in_data.data).save()
            .then((result) => {

                res.status(200).send({ result: result, in_data: in_data });
            })
            .catch((error) => {

                res.status(200).send({ err: error });
            });
    }
};

var update = (req, res, next) => {

    var id = req.params.id;
    User.findOne({ where: { id: id } })
        .then((result) => {

            if (result === null) {
                res.status(200).send({ err: ["Record not found!"] });
            } else {
                var in_data = {};
                var in_data = CommonCntrl_obj.check_inputs(req.body, false);

                if (in_data.err.length) {
                    res.status(200).send({ in_data });
                } else {
                    User.update(in_data.data, { where: { id: id } })
                        .then((result) => {

                            res.status(200).send({ result: result, in_data: in_data });
                        })
                        .catch((error) => {

                            res.status(200).send({ err: error });
                        });
                }
            }
        })
        .catch((error) => {

            res.status(200).send({ err: error });
        });
};

var soft_delete = (req, res, next) => {

    var id = req.params.id;
    User.find({ where: { id: id } })
        .then((result) => {

            if (result === null) {

                res.status(200).send({ err: ["Record not found!"] });
            } else {

                var in_data = {
                    status: 'DELETED'
                };

                User.update(in_data, { where: { id: id } })
                    .then((result) => {

                        res.status(200).send({ result: result, in_data: 'Record deleted softly!' });
                    })
                    .catch((error) => {

                        res.status(200).send({ err: error });
                    });
            }
        })
        .catch((error) => {

            res.status(200).send({ err: error });
        });
};

var hard_delete = (req, res, next) => {

    var id = req.params.id;

    User.find({ where: { id: id } })
        .then((result) => {

            if (result === null) {

                res.status(200).send({ err: ["Record not found!"] });
            } else {

                User.destroy({ where: { id: id } })
                    .then((result) => {

                        res.status(200).send({ result: result, in_data: 'Record deleted successfully!' });
                    })
                    .catch((error) => {

                        res.status(200).send({ err: error });
                    });
            }
        })
        .catch((error) => {

            res.status(200).send({ err: error });
        });
};

var fetchAll = (req, res, next) => {

    User.findAll({
        attributes: ['firstName', 'lastName', 'fatherName', 'enqDate', 'courseId', 'remarks', 'status']
    })
        .then((result) => {

            if (result === null) {

                res.status(200).send({ err: ["Records not found!"] });
            } else {

                res.status(200).send({ err: [], result: result });
            }
        })
        .catch((error) => {

            res.status(200).send({ err: error });
        });
};

var fetchById = (req, res, next) => {

    var id = req.params.id;

    User.find({ where: { id: id } })
        .then((result) => {

            if (result === null) {

                res.status(200).send({ err: ["Record not found!"] });
            } else {

                res.status(200).send({ err: [], result: result });
            }
        })
        .catch((error) => {

            res.status(200).send({ err: error });
        });
};

module.exports = {
    insert: insert,
    update: update,
    fetchAll: fetchAll,
    fetchById: fetchById,
    hardDelete: hard_delete,
    softDelete: soft_delete
};
