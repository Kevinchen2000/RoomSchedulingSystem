


//===Validation JQ=======================================================================

$(document).ready(function () {
    $('#addRoom').formValidation({
        message: 'This value is not valid',
        err: {
            container: 'tooltip'
        },
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {

            //---------------------------------------------------------------------------------------------------
            cboBuilding1: {    //Target Name Require
                group: '.col-lg-14',      // Value must match with the target !!!
                validators: {
                    notEmpty: {
                        message: 'The building is required and cannot be empty' //Error Message 1
                    },
                }
            },

            //---------------------------------------------------------------------------------------------------
            txtStuCap1: {    //Target Name Require
                validators: {
                    notEmpty: {
                        message: 'The student capacity is required and cannot be empty' //Error Message 1
                    },
                    stringLength: {
                        min: 1, // Max # allow 
                        max: 3, // Min # allow
                        message: 'The full name must be not less than 1 and no more than 3 number long'//Error Message 3
                    },
                    regexp: {
                        regexp: /^\d+$/, // Accept only number 
                        message: 'The student capacity can only accept number' //Error Message 3
                    }
                }
            },



            //---------------------------------------------------------------------------------------------------
            txtRoomNum1: {    //Target Name Require
                validators: {
                    notEmpty: {
                        message: 'The room number is required and cannot be empty' //Error Message 1
                    },
                    stringLength: {
                        min: 3,
                        max: 4,
                        message: 'The room number must be not less than 3 and no more than 4 number long'//Error Message 3
                    },
                    regexp: {
                        regexp: /^\d+$/,
                        message: 'The room number can only accept number' //Error Message 3
                    }
                }
            },
        }
    });
}
);

//===End Validation JQ=======================================================================




