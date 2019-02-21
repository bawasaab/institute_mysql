var express = require('express');
const jwt = require('jsonwebtoken');
var User = require('../models').User;

var signin = ( req, res, next ) => {

    var email = req.body.email;

    User.find({ where: { email: email } })
        .then((result) => {

            if (result === null) {

                res.status(200).send({ err: ["Record not found!"] });
            } else {

                jwt.sign({result},'SuperSecRetKey', { expiresIn: 60 * 60 }, (err, token) => {
                    res.status(200).send({ err: [], token: 'bearer '+ token });
                });
            }
        })
        .catch((error) => {

            res.status(200).send({ err: error });
        });
};

var verifyToken = (req, res, next) => {
    
    //Request header with authorization key
    const bearerHeader = req.headers['authorization'];
    
    //Check if there is  a header
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        
        //Get Token arrray by spliting
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, 'SuperSecRetKey', (err, authData)=>{

            if(err){
                res.sendStatus(403);
            }else{
                
                //call next middleware
                next();
            }
        });
    }else{
        res.sendStatus(403);
    }
};

module.exports = {
    signin: signin,
    verifyToken: verifyToken
};
