var express = require('express');
var Enquiry = require('../models').Enquiry;
var CommonCntrl = require('./common_controller');

module.exports = class EnquiryController extends CommonCntrl {

    constructor() {

        var config = {
            err_messages: {},
            expected_keys: [],
            not_null_keys: [],
            required_keys: []
        };
        
        config.err_messages = {
            'firstName': "First Name",
            'lastName': "Last Name",
            'fatherName': "Father Name",
            'enqDate': "Enquiry Date",
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

        super(config);
    }

    fetchAll(req, res, next) {

        Enquiry.findAll({
            attributes: ['firstName', 'lastName', 'fatherName', 'enqDate', 'courseId', 'remarks', 'status']
        })
        .then((result) => {

            if (result === null) {

                res.status(200).send({ err: ["Records not found!"] });
            } else {

                res.status(200).send({ err: [], result: result, authData: req.authData });
            }
        })
        .catch((error) => {

            res.status(200).send({ err: error });
        });
    }
}
