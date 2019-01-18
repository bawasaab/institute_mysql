module.exports = class CommonController {

    constructor(in_data) {

        this.err_messages = in_data.err_messages;
        this.expected_keys = in_data.expected_keys;
        this.not_null_keys = in_data.not_null_keys;
        this.required_keys = in_data.required_keys;
    }

    get_expected_keys(in_data_obj) {

        var out_data_obj = {};

        var providedKeys = this.expected_keys.filter((key) => {
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

        var out_err = [];

        var err = this.not_null_keys.filter((key) => {
            var flag = true;
            var val = in_data_obj[key];
           
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

        var out_err = [];

        var err = this.required_keys.filter((key) => {
            var flag = true;
            var val = in_data_obj[key];
            
            if (!(key in in_data_obj)) {
                out_err.push(this.err_messages[key] + ' is required!');
                flag = false;
                console.log("if condition in common controller get required keys");
            } else if (val == undefined || val.trim() == '') {
                out_err.push(this.err_messages[key] + ' must contains a value!');
                flag = false;
                console.log("else condition in common controller get required keys");
            }
            return flag;
        });

        return {
            err: out_err,
            data: in_data_obj
        };
    }

    check_inputs(in_data_obj, in_required) {

        var out_err = {};

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

        var check_required = in_required != undefined && in_required == true ? true : false;

        var out_expected_keys = this.get_expected_keys(in_data_obj);


        if (check_required) {

            var out_required_keys = this.get_required_keys(out_expected_keys);
            if (out_required_keys.err.length) {
                return { err: out_required_keys };
            }

            var out_not_null_keys = this.get_not_null_keys(out_required_keys.data);
            
            if (out_not_null_keys.err.length) {
                return { err: out_not_null_keys };
            }
        } else {

            var out_required_keys = {};
            out_required_keys.data = out_expected_keys;
        }

        return {
            err: [],
            data: out_required_keys.data
        };
    }
}

