const LeadModel = require('../models').Lead;
const CommonCntrl = require('./common_controller');
var config = {
    err_messages: {},
    expected_keys: [],
    not_null_keys: [],
    required_keys: []
};

module.exports = class LeadController {
    
    constructor() {
        
        config.err_messages = {
            'firstName': "First Name",
            'lastName': "Last Name",
            'contactNo': "Contact number",
            'source': "Source",
            'status': "Status"
        };
        
        config.expected_keys = [
            'firstName',
            'lastName',
            'contactNo',
            'source',
            'status'
        ];
        
        config.not_null_keys = [
            'firstName'
        ];
        
        config.required_keys = [
            'firstName'
        ];
    }

    insert(req, res, next) {

        let obj = new CommonCntrl(  config );
        let in_data = {};
        in_data = obj.check_inputs(req.body, true);
        
        if (in_data.err.length > 0) {
    
            res.status(200).send({ in_data });
        } else if ((typeof in_data.err.err != "undefined") && (in_data.err.err.length > 0)) {
    
            res.status(200).send({ in_data });
        } else {
    
            LeadModel.build(in_data.data).save()
                .then((result) => {
    
                    res.status(200).send({ result: result, in_data: in_data });
                })
                .catch((error) => {
    
                    res.status(200).send({ err: error });
                });
        }
    }

    update(req, res, next) {

        var id = req.params.id;
        LeadModel.findOne({ where: { id: id } })
            .then((result) => {
    
                if (result === null) {
                    res.status(200).send({ err: ["Record not found!"] });
                } else {
                    let obj = new CommonCntrl(  config );
                    let in_data = {};
                    in_data = obj.check_inputs(req.body, false);
    
                    if (in_data.err.length) {
                        res.status(200).send({ in_data });
                    } else {
                        LeadModel.update(in_data.data, { where: { id: id } })
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
    }

    fetchAll(req, res, next) {

        LeadModel.findAll({
            attributes: ['id', 'firstName', 'lastName', 'contactNo', 'source', 'status', 'createdAt', 'updatedAt']
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
    }

    fetchById(req, res, next) {

        var id = req.params.id;
    
        LeadModel.find({ where: { id: id } })
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
    }

    softDelete(req, res, next) {

        var id = req.params.id;
        LeadModel.find({ where: { id: id } })
            .then((result) => {
    
                if (result === null) {
    
                    res.status(200).send({ err: ["Record not found!"] });
                } else {
    
                    var in_data = {
                        status: 'DELETED'
                    };
    
                    LeadModel.update(in_data, { where: { id: id } })
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
    }

    hardDelete(req, res, next) {

        var id = req.params.id;
    
        LeadModel.find({ where: { id: id } })
            .then((result) => {
    
                if (result === null) {
    
                    res.status(200).send({ err: ["Record not found!"] });
                } else {
    
                    LeadModel.destroy({ where: { id: id } })
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
}
