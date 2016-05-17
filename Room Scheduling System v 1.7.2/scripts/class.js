/*
***************************************************************************************************************************************************
    File name: class.js
    Version: 1.4
    Date: 4/27/2016
    Editor: Kevin

    Require support:

    -class.html
    -Bootbox.js Version 4.4.0
    -jquery.min.js 2.2.3
    -Validation 6.0 (All)
    

****************************************************************************************************************************************************
*/

/*
Javascript Events:
- mouseenter
- mouseleave
- mousedown
- mouseup
- mousemove
- keydown //keyboard Even
- keyup //keyboard Even
- blur
- focus
- input
- click
- check //not work
*/


//------------------------Class variable---------------------
var primaryKey = null;
var objectKey = "class";

var subject = null;
var coursesNum = null;
var credits = null;

var monday = false;
var tuesday = false;
var wednesday = false;
var thusday = false;
var friday = false;
var saturday = false;
var availabilityFrom = null;
var availabilityTo = null;
var stuCap = null;
var spec = "";
var computer = false;
var mediaCenter = false;
var smartBoard = false;
var projector = false;

var classIn = new Object;
var saveIndex = null;

var classOut1 = new Object;
classOut1 = { items: [] };
//------------------------End Class variable---------------------

//  JASON Format Sample ---------------------------------------------------------------
//classIn = {
//   items:
//   [  // this file must be empty (above is the --Aata Format--)
// { primaryKey, buildingName, stuCap, spec, roomNum, computer, smartBoard}  
//  ]
//}; //-ReadData-:   room.items[1];
//-------------------------------------------------------------------------------------


//Getting HTML DOM object value 
var cboSubject = document.getElementById("cboSubject");
var txtCoursesNum = document.getElementById("txtCoursesNum");
var txtCredits = document.getElementById("txtCredits");
var chkMonday = document.getElementById("chkMonday");
var chkTuesday = document.getElementById("chkTuesday");
var chkWednesday = document.getElementById("chkWednesday");
var chkThusday = document.getElementById("chkThusday");
var chkFriday = document.getElementById("chkFriday");
var chkSaturday = document.getElementById("chkSaturday");
var cboAvailabilityFrom = document.getElementById("cboAvailabilityFrom");
var cboAvailabilityTo = document.getElementById("cboAvailabilityTo");
var txtStuCap = document.getElementById("txtStuCap");
var cboSpec = document.getElementById("cboSpec");
var chkComputer = document.getElementById("chkComputer");
var chkMediaCenter = document.getElementById("chkMediaCenter");
var chkSmartBoard = document.getElementById("chkSmartBoard");
var chkProjector = document.getElementById("chkProjector");


//Reading user input Even -------------------------------------------------------------------------------------------------------
cboSubject.addEventListener("click", haveSubject); //cbo1 subject
function haveSubject() {
    subject = cboSubject.value;
  
}

txtCoursesNum.addEventListener("input", haveCoursesNum); 
function haveCoursesNum() {
    
    coursesNum = parseFloat((txtCoursesNum.value.replace('-', ''))) || 0;//convert it back to number
    if (coursesNum === 0) //Message box show String is not allow
    
    {
        bootbox.dialog({ //Message box show when user enter string
            message: "String is not allow please enter integer.",
            title: "Validation Error !",
            buttons: {
                danger: {
                    label: "Confirm",
                    className: "btn-danger",
                    callback: function () {
                        //Do something..
                    }
                }
            }
        });

        coursesNum = null;
    }

}


txtCredits.addEventListener("input", haveCredits);
function haveCredits() {
    credits = parseFloat(txtCredits.value) || 0;
    
}


chkMonday.addEventListener("click", haveMonday);//CheckBox Mon
function haveMonday() {
    if (document.getElementById('chkMonday').checked) {
        monday = true;
       
    } else {
        monday = false; //must have when user uncheck value set to defult
        
    }
}


chkTuesday.addEventListener("click", haveTuesday);//CheckBox Tue
function haveTuesday() {
    if (document.getElementById('chkTuesday').checked) {
        tuesday = true;
    } else {
        tuesday = false;
    }
}


chkWednesday.addEventListener("click", haveWednesday);//CheckBox Wen
function haveWednesday() {
    if (document.getElementById('chkWednesday').checked) {
        wednesday = true;
    } else {
        wednesday = false;
    }
}


chkThusday.addEventListener("click", haveThusday);//CheckBox Thu
function haveThusday() {
    if (document.getElementById('chkThusday').checked) {
        thusday = true;
    } else {
        thusday = false;
    }
}

chkFriday.addEventListener("click", haveFriday);//CheckBox Fri
function haveFriday() {
    if (document.getElementById('chkFriday').checked) {
        friday = true;
    } else {
        friday = false;
    }
}


chkSaturday.addEventListener("click", haveSaturday);//CheckBox Sat
function haveSaturday() {
    if (document.getElementById('chkSaturday').checked) {
        saturday = true;
    } else {
        saturday = false;
    }
}


cboAvailabilityFrom.addEventListener("click", havevAilabilityFrom); //cbo1 subject
function havevAilabilityFrom() {
    availabilityFrom = cboAvailabilityFrom.value;
}


cboAvailabilityTo.addEventListener("click", havevAilabilityTo); //cbo1 subject
function havevAilabilityTo() {
    availabilityTo = cboAvailabilityTo.value;
}



txtStuCap.addEventListener("input", haveStudentCap); //CheckBox stuCap
function haveStudentCap() {
    stuCap = parseFloat(txtStuCap.value) || 0;
    
}


cboSpec.addEventListener("click", haveSpec); //cbo spec
function haveSpec() {
    spec = cboSpec.value;  
}


chkComputer.addEventListener("click", haveComputer);//CheckBox Computer
function haveComputer() {
    if (document.getElementById('chkComputer').checked) {
        computer = true;
    } else {
        computer = false;
    }
}


chkMediaCenter.addEventListener("click", haveMediaCenter);//CheckBox MediaCenter
function haveMediaCenter() {
    if (document.getElementById('chkMediaCenter').checked) {
        mediaCenter = true;
    } else {
        mediaCenter = false;
    }
}


chkSmartBoard.addEventListener("click", haveSmartBoard);//CheckBox SmartBoard
function haveSmartBoard() {
    if (document.getElementById('chkSmartBoard').checked) {
        document.getElementById('chkProjector').checked = true; //if smartBoard is check then projector is check
        smartBoard = true;
        projector = true;
    } else {
        smartBoard = false;        
    }
}


chkProjector.addEventListener("click", haveProjector);//CheckBox Projector
function haveProjector() {
    if (document.getElementById('chkProjector').checked) {
        projector = true;
    } else {
        projector = false;
    }
}


//End Reading user input Even ---------------------------------------------------------------------------------------------------------------



//Disabled Random Gen-------------------------------------------------------
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
//-------------------------------------------------------------------------

/*
function dataEsitAlert() {
    bootbox.dialog({
        message: "Key: " + primaryKey +
            " already exisit. Data cannot be save, would you like to try again ?",
        title: "Save Error !",
        buttons: {
            main: {
                label: "Try again",
                className: "btn-primary",
                callback: function () {
                    saveClassData(); //if user click try again
                    //Do something..
                }
            },
            danger: {
                label: "Cancel",
                className: "btn-danger",
                callback: function () {
                    bootstrap_alert.notice('cInfo', 'Important:  ', 'Data have not save !'
                 , 200, 0, 2000, 0, 0);
                    console.log("DataSave Canceled");
                }
            },

        }
    });
}
*/

function ifDataExisAl(pk) { //Dual choice Alert when data exist in the database 
    var pk;
    var r = confirm("Save Error: " + "Key: " +
        pk + " already exist if Ok is click, previous data will be cover !");
    if (r === true) {
        saveRoomDataNow(); //Existing data will be overwrited 
        ms = "Data have save !";
    } else {
        ms = "Save has been canceled !";
        bootstrap_alert.notice('roInfo', 'Important:  ', 'Data have not save !'
                           , 200, 0, 2000, 0, 0);
    }
    document.getElementById("demo").innerHTML = ms; //Display Message 
}




function saveClassData() { //function call when AddClass button is click
    if (subject !== null && coursesNum !== null &&coursesNum !==0 && credits !== null
        && availabilityFrom !==null && availabilityTo !==null &&
        stuCap !== null && monday === true || tuesday === true
        || wednesday === true || thusday === true || friday === true
        || saturday ===true ) {//>1 if text box has no value 
       
        primaryKey = subject + coursesNum; //create primary key    


        if (localStorage.getItem(primaryKey) === null)
        {//Dont not allow duplicated key
            saveClassDataNow(); //Call save method and save the data now
        }
        else
        {
            ifDataExisAl(primaryKey); //if data exist 

        }


    }
    else {
        bootbox.dialog({
            message: "Data can't save! Please entery all require info and try again.",
            title: "Validation Error !",
            buttons: {
                danger: {
                    label: "Confirm",
                    className: "btn-danger",
                    callback: function () {
                        //Do something..
                    }
                }
            }
        });
    }
}






function saveClassDataNow()
{//Insert data into JASON format 

    classIn =
            {
                items: [

                       [
                           { primaryKey },
                           { objectKey },
                           { subject },
                           { coursesNum },
                           { credits },
                           { monday },
                           { tuesday },
                           { wednesday },
                           { thusday },
                           { friday },
                           { saturday },
                           { availabilityFrom },
                           { availabilityTo },
                           { stuCap },
                           { spec },
                           { computer },
                           { mediaCenter },
                           { smartBoard },
                           { projector }
                       ]
                ]
            };

    //classOut1.items[0][0].primaryKey //read data

    if (typeof (Storage) !== "undefined") {

        saveIndex = primaryKey; //localStore Index = classKey
        localStorage.setItem(saveIndex, JSON.stringify(classIn.items[0]));

        bootstrap_alert.notice('cInfo','Success:  ', 'Data have save !', 200, 0, 2000, 0, 3);
        // Retrieve
        //alert("Data Save: " + localStorage.getItem(saveIndex));
        clearData();
    }
    else {

        bootbox.dialog({
            message: "Sorry! No Web Storage support.",
            title: "Save Error !",
            buttons: {
                danger: {
                    label: "Confirm",
                    className: "btn-danger",
                    callback: function () {
                        //Do something.. Whenc click button
                    }
                }
            }
        });


    }
} //End of Function saveClassDataNow--------------------------------------------------------------

//Function: clearData------------------------------------------------------------------------------------
function clearData ()
{
    var primaryKey = null;
    var keyChar = null;              
    var keyNum = null;   
    var subject = null;
    var coursesNum = null;
    var credits = null;
    var monday = null;
    var tuesday = null;
    var wednesday = null;
    var thusday = null;
    var friday = null;
    var saturday = null;
    var availabilityFrom = null;
    var availabilityTo = null;
    var stuCap = null;
    var spec = null;
    var computer = null;
    var mediaCenter = null;
    var smartBoard = null;
    var projector = null;
    var saveIndex = null;
}//End of Function: clearData------------------------------------------------------------------------------



//read localstorage date display data to console;
for (var i = 0, len = localStorage.length; i < len; ++i) {
    classOut1.items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    if (classOut1.items[i][1].objectKey === "class") {
        console.log("Class Item: " + localStorage.getItem(localStorage.key(i)));
    }
} 



//--------------------------------------Notification Box------------------------------------------------------------
bootstrap_alert = function () { }
//Red alert box for notification------------------------------------------------
bootstrap_alert.notice = function (target, title, message, d1, fIn, d2, fOut, colorIndex) {
    var target; //HTML id
    var title;
    var message;
    var d1; //200
    var fIn; //0 or ""
    var d2; //2000-4000
    var fOut; //0 or ""
    var colorIndex;
    var color = ['<div class="alert alert-danger">',
                 '<div class="alert alert-info">',
                 '<div class="alert alert-warning">',
                 '<div class="alert alert-success">'];
    //0 read, 1 blue, 2 yellow, 3 green


    var object1 =
$('#' + target).html(color[colorIndex] + '<a class="close" data-dismiss="alert">¡Á</a><span>'
  + '<strong>' + title + '</strong>' + message + '</span></div>');
    object1.delay(d1).fadeIn(fIn).delay(d2).fadeOut(fOut);
}


//Use Method---------------------------------------------------------------------
// rInfo, cInfo, hInfo, rInfo
// bootstrap_alert.notice('rInfo','title','message',200,0,4000,0,0);

//------------------------------------End Notification Box------------------------------------------------------------

bootstrap_alert.notice('cInfo', 'Important:  ', 'Please compeleted'
    + 'entering the room data before enter the class data', 200, 0, 4000, 0, 1);




