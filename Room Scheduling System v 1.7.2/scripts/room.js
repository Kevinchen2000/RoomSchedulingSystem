
/*
***************************************************************************************************************************************************
    File name: room.js
    Version: 1.4
    Date: 4/28/2016
    Editor: Kevin

    Require support:

    -room.html
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
var objectKey = "room";

var building = "";
var stuCap = null;
var spec = "";
var roomNum = null;

var computer = false;
var smartBoard = false;
var mediaCenter = false;
var projector = false;

var roomIn = new Object;
var saveRoomIndex = null;

var roomOut1 = new Object; // Object that use to contain and format user input data and store to data base 
roomOut1 = { items: [] }; 
//------------------------End Class variable---------------------

//  JASON Format Sample ---------------------------------------------------------------
//var saveIndexArray =[];

//roomIn = {
//   items:
//   [  // this file must be empty (above is the --Aata Format--)
// { primaryKey, buildingName, stuCap, spec, roomNum, computer, smartBoard}  
//  ]
//}; //-ReadData-:   room.items[1];
//-------------------------------------------------------------------------------------




//Getting HTML DOM object value 
var cboBuilding = document.getElementById("cboBuilding");  
var txtRoomNum = document.getElementById("txtRoomNum");
var txtStuCap = document.getElementById("txtStuCap");
var cboSpec = document.getElementById("cboSpec");
var chkComputer = document.getElementById("chkComputer");
var chkMediaCenter = document.getElementById("chkMediaCenter");
var chkSmartBoard = document.getElementById("chkSmartBoard");
var chkProjector = document.getElementById("chkProjector");


//Reading user input Even -------------------------------------------------------------------------------------------------------
if (cboBuilding){//if object is not null then addEventListener
    cboBuilding.addEventListener("click", haveBuilding); //cbo BuildingName
    function haveBuilding() {
        building = cboBuilding.value;

    }
}

if (txtRoomNum) {//if object is not null then addEventListener
    txtRoomNum.addEventListener("input", haveRoomNum); //checkBox RoomNumber
    function haveRoomNum() {
        roomNum = parseFloat(txtRoomNum.value) || 0;
        
    }
}

if (txtStuCap) {//if object is not null then addEventListener
    txtStuCap.addEventListener("input", haveStudentCap); //checkBox StudentCapacity
    function haveStudentCap() {
        stuCap = parseFloat(txtStuCap.value) || 0;
       
    }
}

if (haveSpec) {//if object is not null then addEventListener
    cboSpec.addEventListener("click", haveSpec); //cbo Specialization
    function haveSpec() {
        spec = cboSpec.value;
        
    }
}


if (chkComputer) {//if object is not null then addEventListener
    chkComputer.addEventListener("click", haveComputer);//CheckBox Computer
    function haveComputer() {
        if (document.getElementById('chkComputer').checked) {
            computer = true;
        } else { computer = false; }
        bootstrap_alert.notice('roInfo', 'Important:  ', 'Computer is check', 200, 0, 1000, 0, 1);
    }
} 

if (chkMediaCenter) {//if object is not null then addEventListener
    chkMediaCenter.addEventListener("click", haveMediaCenter);//CheckBox MediaCenter
    function haveMediaCenter() {
        if (document.getElementById('chkMediaCenter').checked) {
            mediaCenter = true;
        } else { computer = false; }
    }
}

if (chkSmartBoard) {//if object is not null then addEventListener
    chkSmartBoard.addEventListener("click", haveSmartBoard);//CheckBox SmartBoard
    function haveSmartBoard() {
        if (document.getElementById('chkSmartBoard').checked) {
            document.getElementById('chkProjector').checked = true; //if smartBoard is check then projector is check
            smartBoard = true;
            projector = true;
        } else { smartBoard = false; }
    }
}

if (chkProjector) {//if object is not null then addEventListener
    chkProjector.addEventListener("click", haveProjector);//CheckBox Projector
    function haveProjector() {
        if (document.getElementById('chkProjector').checked) {
            projector = true;
        } else { projector = false; }
    }
}
//End Reading user input Even ---------------------------------------------------------------------------------------------------------------


//Web Page compa error and flash display error----------------------Disable For Now 
/*
function dataEsitAlert()
{
    
    bootbox.dialog

          ({
              message: "Key: " + primaryKey +
                  " already exisit. Data will be covered if process, would you like to process ?",
              title: "Save Error !",
              buttons:
                  {
                      danger:
                    {
                        label: "Process",
                        className: "btn-danger",
                        callback: function () {
                            // saveRoomDataNow();
                            alert("can not save")

                        }
                    },
                      main:
                  {
                      label: "Cancel",
                      className: "btn-primary",
                      callback: function () {
                          //          bootstrap_alert.notice('roInfo', 'Important:  ', 'Data have not save !'
                          // , 200, 0, 2000, 0, 0);
                          console.log("DataSave Canceled");
                      }
                  }

                  }
          });

}
*/
//----------------------------------------------------------------------------------------------------------------

function ifDataExisAl(pk)  //Dual choice Alert when data exist in the database 
{
    var pk;
    var r = confirm("Save Error: " + "Key: " +
        pk + " already exist if Ok is click, previous data will be cover !");
    if (r == true)
    {
        saveRoomDataNow(); //Existing data will be overwrited 
        ms = "Data have save !";
    } else
    {
        ms = "Save has been canceled !";
        bootstrap_alert.notice('roInfo', 'Important:  ', 'Data have not save !'
                           , 200, 0, 2000, 0, 0);
    }
    document.getElementById("demo").innerHTML = ms;//Display Message 
}



//Disabled Random Gen-------------------------------------------------------
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
//-------------------------------------------------------------------------


function saveRoomData() //function call when AddRoom button is click 
{ 
   
    if (building !=="" && stuCap !== null && roomNum !== null) //all require field has data 
    {
        primaryKey = building + roomNum;  //create primary key   

        if (localStorage.getItem(primaryKey) === null) //if primaryKey does not exist in database
        {
            
            saveRoomDataNow();    //Call save method and save the data now         
        }
        else
        {
            ifDataExisAl(primaryKey) //call for alert if primarykey does exist in the data base
            
        }

    }
    else 
    {       
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

        //dataEsitAlert();
    }
}



function saveRoomDataNow ()
{//Insert data into JASON format 
    roomIn = 
          {
              items: [

                     [    
                         { primaryKey },
                         { objectKey },
                         { building },
                         { roomNum },
                         { stuCap },
                         { spec },      
                         { computer },
                         { mediaCenter },
                         { smartBoard },
                         { projector }
                     ]
              ]
          };

    //roomOut1.items[0][0].primaryKey //way to read data 

    if (typeof (Storage) !== "undefined") {
        saveRoomIndex = primaryKey; //localStore Index = roomKey
        localStorage.setItem(saveRoomIndex, JSON.stringify(roomIn.items[0])); 

        bootstrap_alert.notice('roInfo','Success:  ', 'Data have save !', 200, 0, 2000, 0, 3); 

        //alert("Data Save: " + localStorage.getItem(saveRoomIndex));
        clearData(); //clear local data

    } else { //If local storage is not supported 
        
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

}//End of Function saveClassDataNow--------------------------------------------------------------




function clearData ()//Clear all static data--------------------------------------------------------------
{   var primaryKey = null;
    var building = null;
    var stuCap = null;
    var spec = null;
    var roomNum = null;
    var computer = null;
    var smartBoard = null;
    var mediaCenter = null;
    var projector = null;
    var saveRoomIndex = null;
}//End of Function: clearData------------------------------------------------------------------------------



//read localstorage date display data to console;
for (var i = 0, len = localStorage.length; i < len; ++i)
{
    roomOut1.items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    if (roomOut1.items[i][1].objectKey==="room")
    {
        console.log("Room Item: " + localStorage.getItem(localStorage.key(i)));
    }
}


//--------------------------------------Notification Box------------------------------------------------------------
bootstrap_alert = function () { }
//Red alert box for notification------------------------------------------------
bootstrap_alert.notice = function (target, title, message, d1, fIn, d2, fOut, colorIndex)
{
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
                 '<dilocv class="alert alert-success">'];
    //0 read, 1 blue, 2 yellow, 3 green


    var object1 =
$('#'+target).html(color[colorIndex] + '<a class="close" data-dismiss="alert">×</a><span>'
  + '<strong>' + title + '</strong>'  +message + '</span></div>');
    object1.delay(d1).fadeIn(fIn).delay(d2).fadeOut(fOut);
}


//Use Method---------------------------------------------------------------------
 // rInfo, cInfo, hInfo, rInfo
// bootstrap_alert.notice('rInfo','title','message',200,0,4000,0,0);

//------------------------------------End Notification Box------------------------------------------------------------

bootstrap_alert.notice('roInfo','Important:  ', 'Please compeleted' 
    +'entering the room data before enter the class data',200,0,4000,0,1);