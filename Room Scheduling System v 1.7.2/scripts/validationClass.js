
/*
*****************************************************************************************************************
    File name: validatonClass.js
    Version: 1.1
    Date: 4/20/2016
    Editor: Kevin

Require support:
    -Bootbox.js Version 4.4.0
    -google/scripts/jquery.min.js
    -Validation 6.0 (All)
    -room.html
    -Class Scheduling Main v08

*********************************************************************************************************************
*/


//===Validation JQ==============================================================================================================
$(document).ready(function () {
    $('#addClass').formValidation({
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

            //---------------------------------------------------------------------------------------------------------------------------
            cboSubject1: {    //Target Name Require
                group: '.col-lg-14',      // Value must match with the target !!!
                validators: {
                    notEmpty: {
                        message: 'The subject of the class is required and cannot be empty' //Error Message 1
                    },
                }
            },
            //---------------------------------------------------------------------------------------------------------------------------
            txtCoursesNum1: {    //Target Name Require
                validators: {
                    notEmpty: {
                        message: 'The courses number is required and cannot be empty' //Error Message 1
                    },
                    stringLength: {
                        min: 6,
                        max: 8,
                        message: 'The courses number must be not less than 5 and no more than 7 number long'//Error Message 3
                    },
                    regexp: {
                        regexp: /^\d+$/,
                        message: 'The courses number can only accept number' //Error Message 3
                    }
                }
            },
           
            //---------------------------------------------------------------------------------------------------------------------------
            txtCredits1: {    //Target Name Require
                validators: {
                    notEmpty: {
                        message: 'The class credits is required and cannot be empty' //Error Message 1
                    },
                    between:{
                        min: 1,
                        max: 5,
                        message: 'The class credits number must no less than 1 and no more then 5'
                    },
                    stringLength: {
                        min: 1,
                        max: 1,
                        message: 'The class credits must be exactly 1 number long'//Error Message 3
                    },
                    regexp: {
                        regexp: /^\d+$/,
                        message: 'The class credits can only accept number' //Error Message 3
                    }
                }
            },




            //---------------------------------------------------------------------------------------------------------------------------
            'chkWeekDay[]': { // At lease one box must be check no more than 6
                validators: {
                    choice: {
                        min: 1,
                        max: 5,
                        message: 'Please specify at least one day during the week'
                    }
                }
            },

            //---------------------------------------------------------------------------------------------------------------------------
            cboAvailabilityFrom1: {    //Target Name Require
                group: '.col-lg-14',      // Value must match with the target !!!
                validators: {
                    notEmpty: {
                        message: 'The class starting availability time is required and cannot be empty' //Error Message 1
                    },
                }
            },

            //---------------------------------------------------------------------------------------------------------------------------
            cboAvailabilityTo1: {    //Target Name Require
                group: '.col-lg-14',      // Value must match with the target !!!
                validators: {
                    notEmpty: {
                        message: 'The class ending availability time is required and cannot be empty' //Error Message 1
                    },
                }
            },

            //---------------------------------------------------------------------------------------------------------------------------
            txtStuCap1: {    //Target Name Require
                validators: {
                    notEmpty: {
                        message: 'The student capacity is required and cannot be empty' //Error Message 1
                    },
                    stringLength: {
                        min: 1,
                        max: 3,
                        message: 'The full number must be not less than 1 and no more than 3 number long'//Error Message 3
                    },
                    regexp: {
                        regexp: /^\d+$/,
                        message: 'The student capacity can only accept number' //Error Message 3
                    }
                }
            },
            //---------------------------------------------------------------------------------------------------------------------------
        }
    });
}
);
//===End Validation JQ======================================================================================================================



//------------Handel Course Number-------------------------------------------------------------------------------------------------
String.prototype.replaceAt = function (index, character)
{
    return this.substr(0, index) +
    character + this.substr(index + character.length);
}








var coursesNum = "";
var result = "";
var txtCoursesNum = document.getElementById("txtCoursesNum");
txtCoursesNum.addEventListener("input", haveCoursesNum); 

function haveCoursesNum()
{
    coursesNum = txtCoursesNum.value;
    //console.log(coursesNum);

    if (coursesNum.charAt(3) != "-") //if user enter courses# at char 4 does not contain -
    {
        if (coursesNum.length > 3) //if user enter courses# length is greater than 4
        {
            //inseart index function
            String.prototype.splice = function (idx, rem, str)
            {
                return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
            };
            var result = coursesNum.splice(3, 0, "-"); //call function insear - at index location 3
            document.getElementById("txtCoursesNum").value = result //display the result back to the HTML
        }
    }

}//End EvenListener







//------------End Handel Course Number-------------------------------------------------------------------------------------------------

