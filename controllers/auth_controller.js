const jwt = require('jsonwebtoken');
const User = require('../models').User;
const accesses = require('../config/access');

module.exports = class AuthController {

    constructor(){}

    signin( req, res, next ) {

        var email = req.body.email;
    
        User.find({ where: { email: email } })
            .then((result) => {
    
                if (result === null) {
    
                    res.status(200).send({ err: ["Record not found!"] });
                } else {
    
                    let userData = {
                        "id": result.id,
                        "firstName": result.firstName,
                        "lastName": result.lastName,
                        "email": result.email
                    };
    
                    jwt.sign({userData},'SuperSecRetKey', { expiresIn: 60 * 60 }, (err, token) => {
                        res.status(200).send({ err: [], token: 'bearer '+ token });
                    });
                }
            })
            .catch((error) => {
    
                res.status(200).send({ err: error });
            });
    }
    
    verifyToken(req, res, next) {
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
                    res.status(403).send({ err: err });
                }else{
                    
                    req.authData = authData;
                    //call next middleware
                    next();
                }
            });
        }else{
            res.status(403).send({ err: 'Header is not defined.' });            
        }
    }

    verifyAccess( req, res, next ) {

        let full_path = req.baseUrl + req.route.path;
        // let roleId = req.authData.roleId;
        let roleId = 2;

        if( accesses.hasOwnProperty( full_path ) ) {

            let authorisedRoles = accesses[full_path];
            if ( authorisedRoles.indexOf( roleId ) > -1 ) {
                //call next middleware
                next();
            } else {
                // Unauthorized Access
                res.status(403).send({ err: 'Unauthorized access.' });
            }
        } else {
            // Path is not declared in the /config/access.json
            res.status(403).send({ err: 'Path is not declared in the /config/access.json' });
        }
    }
}
