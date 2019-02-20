module.exports = class CommonController {

    constructor(in_data) {

        this.err_messages = in_data.err_messages;
        this.expected_keys = in_data.expected_keys;
        this.not_null_keys = in_data.not_null_keys;
        this.required_keys = in_data.required_keys;
        this.form_validations = in_data.form_validations;
    }

    get_expected_keys(in_data_obj) {

        let out_data_obj = {};

        let providedKeys = this.expected_keys.filter((key) => {
            if (key in in_data_obj) {
                out_data_obj[key] = in_data_obj[key];
                return true;
            } else {
                return false;  ///return column doesnot exist
            }
        });

        return out_data_obj;
        
    }

    get_not_null_keys(in_data_obj) {

        let out_err = [];

        let err = this.not_null_keys.filter((key) => {
            let flag = true;
            let val = in_data_obj[key];
           
            if (!(key in in_data_obj) && val == undefined || val.trim() == '') {
                out_err.push(this.err_messages[key] + ' must contains a value!');
                flag = false;
                
            }
            return flag;
        });

        return {
            err: out_err,
            data: in_data_obj
        };
    }

    get_required_keys(in_data_obj) {

        let out_err = [];

        let err = this.required_keys.filter((key) => {
            let flag = true;
            let val = in_data_obj[key];
            
            if (!(key in in_data_obj)) {
                out_err.push(this.err_messages[key] + ' is required!');
                flag = false;
            } else if (val == undefined || val.trim() == '') {
                out_err.push(this.err_messages[key] + ' must contains a value!');
                flag = false;
            }
            return flag;
        });

        return {
            err: out_err,
            data: in_data_obj
        };
    }

    validate_email( in_email ) {

        atpos = in_email.indexOf("@");
        dotpos = in_email.lastIndexOf(".");

        if (atpos < 1 || ( dotpos - atpos < 2 )) {
            return false;
        }
        return true;
    }

    match_password( in_pwd, in_cnf_pwd ) {

        return ( in_pwd.length > 0 && in_pwd == in_cnf_pwd ) ? true : false;
    }

    password_length( in_pwd, in_min, in_max ) {

        return in_pwd.length >= in_min && in_pwd.length <= in_max ? true : false; 
    }

    validate_password( in_pwd, in_type ) {

        // let allLetters = /^[a-zA-Z]+$/;
        // let letter = /[a-zA-Z]/;
        // let number = /[0-9]/;

        let validator;
        if( in_type == 'default' ) {

            // at least one number, one lowercase and one uppercase letter
            // at least six characters
            // matches a string of six or more characters;
            // that contains at least one digit (\d is shorthand for [0-9]);
            // at least one lowercase character; and
            // at least one uppercase character:

            validator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        } else if( in_type == 'advance' ) {

            // at least one number, one lowercase and one uppercase letter
            // at least six characters that are letters, numbers or the underscore

            validator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
        } else {

        }

        validator.test( in_pwd );
    }

    validate_phone_number( in_phone_no, in_format ) {

        const defaults = /^\d{10}$/; // format - XXXXXXXXXX
        const dashes = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/; // format - XXX-XXX-XXXX
        const dots = /^\(?([0-9]{3})\)?[.]?([0-9]{3})[.]?([0-9]{4})$/; // format - XXX.XXX.XXXX
        const spaces = /^\(?([0-9]{3})\)?[ ]?([0-9]{3})[ ]?([0-9]{4})$/; // format - XXX XXX XXXX
        let pattern;

        if( in_format == 'default' ) { 

            pattern = defaults;
        } else if( in_format == 'dashes' ) { 

            pattern = dashes;
        } else if( in_format == 'dots' ) { 

            pattern = dots;
        } else if( in_format == 'spaces' ) { 

            pattern = spaces;
        } else {

        }

        return (in_phone_no.match( pattern )) ? true : false;
    }

    validate_pin_code( in_pin_code ) {

        let pattern = /^\d{6}$/;
        return pattern.test( in_pin_code );
    }

    number_only( in_value, in_allow ) {

        // const floating_point = /^-?\d*[.,]?\d*$/;
        // const Currency = /^-?\d*[.,]?\d{0,2}$/;
        // const Hexadecimal = /^[0-9a-f]*$/i;

        const digits_and_dots = /^\d*\.?\d*$/;
        const positive_and_negative = /^-?\d*$/;
        const positive_only = /^\d*$/;
        let allow;

        if( in_allow == 'digits_and_dots' ) {

            allow = digits_and_dots;
        } else if( in_allow == 'positive_and_negative' ) {

            allow = positive_and_negative;
        } else if( in_allow == 'positive_only' ) {

            allow = positive_only;
        } else {

        }

        return allow.test( in_value );
    }

    validate_form( in_data ) {

        let out_err = [];

        if( this.form_validations.phone != undefined ) {
            let key = this.form_validations.phone.key;
            let format = this.form_validations.phone.format;

            if( !this.validate_phone_number( in_data[key], format ) ) {
                
                out_err.push(this.err_messages[key] + ' must contains a valid phone number!');                
            }
        }

        return {
            err: out_err,
            data: in_data
        };
    }

    check_inputs(in_data_obj, in_required) {

        let out_err = {};
        let out_form_validations;

        if (this.err_messages == undefined) {
            return { err: ['Kindly declare error messages'] };
        } else if (this.err_messages.length == 0) {
            return { err: ['Kindly configure error messages'] };
        }

        if (this.expected_keys == undefined) {
            return { err: ['Kindly declare expected keys'] };
        } else if (this.expected_keys.length == 0) {
            return { err: ['Kindly configure expected keys'] };
        }

        if (this.not_null_keys == undefined) {
            return { err: ['Kindly declare not null keys'] };
        } else if (this.not_null_keys.length == 0) {
            return { err: ['Kindly configure not null keys'] };
        }

        if (this.required_keys == undefined) {
            return { err: ['Kindly declare required keys'] };
        } else if (this.required_keys.length == 0) {
            return { err: ['Kindly configure required keys'] };
        }

        let check_required = in_required != undefined && in_required == true ? true : false;

        let out_expected_keys = this.get_expected_keys(in_data_obj);

        if (check_required) {

            let out_required_keys = this.get_required_keys(out_expected_keys);
            if (out_required_keys.err.length) {
                return out_required_keys;
            }

            let out_not_null_keys = this.get_not_null_keys(out_required_keys.data);
            
            if (out_not_null_keys.err.length) {
                return out_not_null_keys;
            }

            // out_form_validations = this.validate_form( out_required_keys.data );
            out_form_validations = out_not_null_keys;
        } else {
            out_form_validations = {
                err: [],
                data: out_expected_keys
            };
        }

        if (out_form_validations.err.length) {
            return out_form_validations;
        } else {            
            return out_form_validations;
        }
    }
}
