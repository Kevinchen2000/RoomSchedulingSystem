
/*
*****************************************************************************************************************
    File name: result.js
    Version: 1.7
    Date: 5/12/2016
    Editor: Kevin

Require support:
    -Bootbox.js Version 4.4.0
    -google/scripts/jquery.min.js
    -Validation 6.0 (All)
    -room.html
    -Class Scheduling Main v11

*********************************************************************************************************************
*/

//------------------------Global variable------------------------------------------------------------
var genTableData = [];
var classTitle = [];
var classRange = [];
var classTime = [];

var schedBuilding = [];
var schedRoomNum = [];

var schedSubject = [];
var schedCourseNum = [];
var scheFromAvail = [];
var schedToAvail = [];

var schedMo = [];
var schedTu = [];
var schedWe = [];
var schedTh = [];
var schedFr = [];
var schedSa = [];

var schedStuNum = [];
var schedProjector = [];
var schedSmartboard = [];
var schedComputer = [];
var schedMediaCenter = [];
var schedSpec = [];
//object contain Room data from database -----------
var roomPrimaryKeyArray = [];
var buildingArry = [];
var roomNumArry = [];
//------------------------End Global variable---------------------

var localData = new Object;//object that store both class and room data
localData = { items: [] };

var roomOut = new Object; //object that store roon data
roomOut = { items: [] };

var classOut = new Object; //object that store class data
classOut = { items: [] };

//------------------------End Class variable----------------------------------------------------


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var btd  =  []; //building table data under school table
var rtd  =  []; //room table data under building table
var ctd  =  []; //class table data under room table
var ctdd =  []; //class table data detail under class table

//----------------Contain All class number scheduled in side the building
var techCL =  [];
var admCL  =  [];
var humCL  =  [];
var ssbCL  =  [];
var lrcCL  =  [];
var fabCL  =  [];
var vabCL  =  [];
var ccCL   =  [];
var cdcCL  =  [];
//--------------Room
var techRL = [];
var admRL =  [];
var humRL =  [];
var ssbRL =  [];
var lrcRL =  [];
var fabRL =  [];
var vabRL =  [];
var ccRL  =  [];
var cdcRL = [];
//--------------Room counter 
var admRoom  =[];
var techRoom =[];
var humRoom = [];
var ssbRoom = [];
var lrcRoom = [];
var fabRoom = [];
var vabRoom = [];
var ccRoom = [];
var cdcRoom = [];

//Runing function---------------When html is loaded
cleanArrayTool();
getDataBaseData();
setPlugInData();
getPlugInData();
//Sorting data
schoolTable();


function getPlugInData() {
   
    genTableData = new Array(); //created 2D arry (arry inside of array)
    for (i = 0; i < ClassList.length; i++)
    {
        genTableData[i] = new Array(7); //each row contain 7 cell 
    }

    //Getting data from PlugIn and store it into objects--------------------------------------------------------------

    for (var i = 0; i < ClassList.length; i++) //Pass data from plugIn to objects
    {
        schedSubject[i] = ClassList[i].subject;
        schedCourseNum[i] = ClassList[i].courseNum;
        scheFromAvail[i] = ClassList[i].beginAvailability;
        schedToAvail[i] = ClassList[i].endAvailability;

        schedMo[i] = ClassList[i].Mon;
        schedTu[i] = ClassList[i].Tues;
        schedWe[i] = ClassList[i].Wed;
        schedTh[i] = ClassList[i].Thurs;
        schedFr[i] = ClassList[i].Fri;
        schedSa[i] = ClassList[i].Sat;

        schedBuilding[i] = ClassList[i].buildingScheduled;//Building Info
        schedRoomNum[i] = ClassList[i].roomNumScheduled;//Room Info

        schedStuNum[i] = ClassList[i].numSeats;
        schedProjector[i] = ClassList[i].projector;
        schedSmartboard[i] = ClassList[i].smartboard;
        schedComputer[i] = ClassList[i].computers;
        schedMediaCenter[i] = ClassList[i].mediaCenter;
        schedSpec[i] = ClassList[i].specialty;

        if (schedBuilding[i] === "TECH")
        { techCL.push( ClassList[i].courseNum); }
        else if (schedBuilding[i] === "ADM")
        { admCL.push (ClassList[i].courseNum); }
        else if(schedBuilding[i] === "HUM")
        { humCL.push( ClassList[i].courseNum); }
        else if(schedBuilding[i] === "SSB")
        { ssbCL.push(ClassList[i].courseNum); }
        else if(schedBuilding[i] === "LRC")
        { lrcCL.push(ClassList[i].courseNum); }
        else if(schedBuilding[i] === "FAB")
        { fabCL.push( ClassList[i].courseNum); }
        else if(schedBuilding[i] === "VAB")
        { vabCL.push( ClassList[i].courseNum); }
        else if(schedBuilding[i] === "CC")
        { ccCL.push( ClassList[i].courseNum); }
        else if(schedBuilding[i] === "CDC")
        { cdcCL.push( ClassList[i].courseNum); }
        else {}

    }

    //End getting data from PlugIn and store it into objects--------------------------------------------------------------




    for (var i = 0; i < ClassList.length; i++) //Format array data
    {
        classTitle[i] = schedBuilding[i] + " " + schedRoomNum[i] + " " + schedSubject[i] + " " + schedCourseNum[i];
        classTime[i] = schedToAvail[i] - scheFromAvail[i]; //4 hr
        classRange[i] = militTimeConver(scheFromAvail[i]) + //10AM-4PM
                    "-" + militTimeConver(schedToAvail[i]);
    }



    if (classRange.length === ClassList.length)
    {
        for (var i = 0; i < ClassList.length; i++) //put class time range and day of the week to 2D array
        {
            for (var j = 0; j < 7; j++)
            {
                genTableData[i][0] = classRange[i]; 
                genTableData[i][1] = schedMo[i];
                genTableData[i][2] = schedTu[i];
                genTableData[i][3] = schedWe[i];
                genTableData[i][4] = schedTh[i];
                genTableData[i][5] = schedFr[i];
                genTableData[i][6] = schedSa[i];

            }
        }

    }
    else
    { console.log("No match data !"); }


}

function displayGenTable() {

    var tableType1 = "General"
    var header1 = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    tableGen("resultTable", "resultTableBody", tableType1, header1, ClassList.length,
        header1.length, genTableData, classTitle, "");//write data to Gena table
}

//function tableGen(tableName, tableBodyName, tableType, header, rowNum, cellNum, data1, data2)





function clearAllData()//Call dual option dialog box to clear data
{
        

        bootbox.dialog({
            message: "All data will be deleted from the database",
            title: "Warning !",
            buttons: {
                danger: {
                    label: "Delete",
                    className: "btn-danger",
                    callback: function ()
                    {
                        clearClassData();
                        localStorage.clear();
                                                
                    }
                },
                main: {
                    label: "Cancel",
                    className: "btn-primary",
                    callback: function () {
                        console.log("Delection Canceled");
                    }
                },

            }
        });
    }

function roomNotFound ()
{


    bootbox.dialog({
        message: "Room does not exist !",
        title: "Warning !",
        buttons: {
            danger: {
                label: "Delete",
                className: "btn-danger",
                callback: function () {

                }
            }
        }
    });

}



    // Under dropdownMenu1
    function search() { }
    function sortPriorityUp() { }
    function sortPriorityDown() { }
    function sortPriorityUp() { }
    function sortTimeUp() { }
    function sortTimeDown() { }
    function sortDurationUp() { }
    function lSortDurationDown() { }
    //----End dropdownFunction






    //----------------Test Data for Gen Table-------------------------------------
    /*
    
    var sampleData =
                  [   ["08AM-10AM", true,false,true,false,false,false],
                      ["09AM-11AM", false,true,false,true,false,false],
                      ["02PM-03PM", true,false,true,false,true,false],
                      ["04PM-05PM", false,false,false,false,false,true],
                      ["06PM-09PM", true, true, true, true, true, false]
                     
                  ];
    var sampleClassName =
        ["SSB-103-05", "TECH-101-05", "ADM-103-05",
            "CDC-103-05", "ART-103-05"
     
        ];
    //SSB-103-05
    
    tableGen("resultTable", "resultTableBody", 5, 7, sampleData, sampleClassName);
    
    // row 5, cell 7
    
    */
    //----------------End Test Data------------------------------------------------------


    //Plug in---------------------------------------------------------------------------------








    function schoolTable() {
        //table header
        

      
       

        btd = new Array(); //created 2D arry (arry inside of array)
        for (i = 0; i < ClassList.length; i++) {
            btd[i] = new Array(btd.length); //each row contain 3 cell 
        }

        if (admRoom.length > 0){
            btd [0][0] = "ADM";
            btd [0][1] = admRoom.length;
            btd[0][2] = admCL.length;
            var t = [];
            for (var b = 0; b < admRoom.length; b++)
            {         
                t.push(admRoom[b]); //get all class that is schedule to the building             
            }
            admRL = t;
            //console.log(admRL);
        }
        if (techRoom.length > 0){
            btd [1][0] = "TECH";
            btd [1][1] = techRoom.length;
            btd[1][2] = techCL.length;
            var t = [];
            for (var b = 0; b < techRoom.length; b++) {
                t.push(techRoom[b]);
            }
            techRL = t;
        }
        if (humRoom.length > 0) {
            btd[2][0] = "HUM";
            btd[2][1] = humRoom.length;
            btd[2][2] = humCL.length;
            var t = [];
            for (var b = 0; b < humRoom.length; b++) {
                t.push(humRoom[b]);
            }
            humRL = t;
        }
        if (ssbRoom.length > 0) {
            btd[3][0] = "SSB";
            btd[3][1] = ssbRoom.length;
            btd[3][2] = ssbCL.length;
            var t = [];
            for (var b = 0; b < ssbRoom.length; b++) {
                t.push(ssbRoom[b]);
            }
            ssbRL = t;
        }
        if (lrcRoom.length > 0) {
            btd[4][0] = "LRC";
            btd[4][1] = lrcRoom.length;
            btd[4][2] = lrcCL.length;
            var t = [];
            for (var b = 0; b < lrcRoom.length; b++) {
                t.push(lrcRoom[b]);
            }
            lrcRL = t;
        }
        if (fabRoom.length > 0) {
            btd[5][0] = "FAB";
            btd[5][1] = fabRoom.length;
            btd[5][2] = fabCL.length;
            var t = [];
            for (var b = 0; b < fabRoom.length; b++) {
                t.push(fabRoom[b]);
            }
            fabRL = t;
        }
        if (vabRoom.length > 0) {
            btd[6][0] = "VAB";
            btd[6][1] = vabRoom.length;
            btd[6][2] = vabCL.length;
            var t = [];
            for (var b = 0; b < vabRoom.length; b++) {
                t.push(vabRoom[b]);
            }
            vabRL = t;
        }
        if (ccRoom.length > 0) {
            btd[7][0] = "CC";
            btd[7][1] = ccRoom.length;
            btd[7][2] = ccCL.length;
            var t = [];
            for (var b = 0; b < ccRoom.length; b++) {
                t.push(ccRoom[b]);
            }
            ccRL = t;
        }
        if (cdcRoom.length > 0) {
            btd[8][0] = "CDC";
            btd[8][1] = cdcRoom.length;
            btd[8][2] = cdcCL.length;
            var t = [];
            for (var b = 0; b < cdcRoom.length; b++) {
                t.push(cdcRoom[b]);
            }
            cdcRL = t;
        }


        for (var i = 0; i < btd.length; i++)
        {
            btd[i].clean();
        }
        btd.clean(0);
    }



    function displaySchoolTable() {

        var tableID = ": SCC"      
        var header2 = ["Building Name", "Number of Room", "Number of Class"];
        schoolTable();
      /*  var buildingData = [    ["AMD", 12, 6],
                                  ["TECH",8,5],
                                  ["SSB", 4, 2]    ]  */

        var tableType2="School"

        tableGen("resultTable", "resultTableBody", tableType2, header2, btd.length,
        header2.length, btd,0,tableID);//write data to Gena table
    }

//---------------------------------------------------



    function buildingTable(builRomLis, builNam) {
        
        brl = builRomLis;      
            rtd = new Array(); //created 2D arry (arry inside of array)
            for (i = 0; i < brl.length; i++) { //Array size is base on # of room
                rtd[i] = new Array(rtd.length); //each row contain 3 cell 
            }
           


            for (var i = 0; i < brl.length; i++)
            {
                for (var j=0; j<7; j++)
                {
                    if (j === 0) {
                        rtd[i][j] = roomPropertyFinder(brl[i], builNam)[0];
                    }if (j === 1){
                        rtd[i][j] = roomPropertyFinder(brl[i], builNam)[8];
                    } if (j === 2) {
                        rtd[i][j] = roomPropertyFinder(brl[i], builNam)[2];
                    } if (j === 3) {
                        rtd[i][j] = roomPropertyFinder(brl[i], builNam)[6];
                    } if (j === 4) {
                        rtd[i][j] = roomPropertyFinder(brl[i], builNam)[7];
                    } if (j === 5) {
                        rtd[i][j] = roomPropertyFinder(brl[i], builNam)[4];
                    } if (j === 6) {
                        rtd[i][j] = roomPropertyFinder(brl[i], builNam)[5];
                    }
                }
            }
    }
        




    function displayBuildingTable(buildingRoomList, tableID) {

           /* var buildingData = [
                       [101, 20, 3, true, true,true,true],
                       [102, 15, 2, false, false, true, true],
                       [103, 25, 4, true, true, true, false]
        ] */
        var brl1 = buildingRoomList;
       
        var tID1 = ": "+tableID;
        
        buildingTable(brl1, tableID);

        var header2 = ["Room Number", "Number of Class", "Room Capacity", "Smart Board", "Projector", "Computer", "Media Center"];
 
        var tableType2 = "Building"

        tableGen("resultTable", "resultTableBody", tableType2, header2, rtd.length,
        header2.length, rtd, 0, tID1);//write data to Gena table
    }






       $('#').on('click', function (event) {
           deleteTab();
           event.preventDefault(); // To prevent following the link (optional)
           
           displayGenTable();

       });







/*   TESTING DATA
    function roomTable() {
      

        var tableID = ": 101"
        var header2 = ["Courses Number", "Seat (Req)", "Duration (day)", "Smart Board (req)", "Projector (req)", "Computer (req)", "Media Center (req)"];
        var buildingData = [
                             ["111-1101", 20, "1.5HR", true, true, true, true],
                             ["222-2202", 15, "2HR", false, false, true, true],
                             ["333-3303", 10, "3HR", true, true, true, false]
        ]
        var tableType2 = "Room"

        tableGen("resultTable", "resultTableBody", tableType2, header2, buildingData.length,
        header2.length, buildingData, 0, tableID);//write data to Gena table
    }
    */


/*   TESTING DATA
    function classTable() {
      

        var roomNum = 3;
        var tableID = ": 111-1101" + " Room: "+roomNum;

        var header2 = ["Day (week)", "Class Time", "Specialization", "Seat (req)", "Credits", "Duration (day)", "Property (req)"]
        var buildingData = [
                             ["Monday", "8:00AM-9:30AM", "Lab",  20, 3, "1.5Hr", "SB,P,C,MC"],
                             ["Tuesday", "8:00AM-9:30AM", "Lab",  20, 3, "1.5Hr", "SB,P,C,MC"],
                             ["Wednesday", "8:00AM-9:30AM", "Lab", 20, 3, "1.5Hr", "SB,P,C,MC"],
                             ["Thursday", "8:00AM-9:30AM", "Lab", 20, 3, "1.5Hr", "SB,P,C,MC"],
                             ["Friday", "8:00AM-9:30AM", "Lab", 20, 3, "1.5Hr", "SB,P,C,MC"],
                             ["Saturday", "8:00AM-9:30AM", "Lab", 20, 3, "1.5Hr", "SB,P,C,MC"]
        ]
        var tableType2 = "Class"

        tableGen("resultTable", "resultTableBody", tableType2, header2, header2.length,
        header2.length, buildingData, 0, tableID);//write data to Gena table
    }
    */
   


    function tableGen(tableName, tbn, tableType, header, rowNum, cellNum, data1, data2, taIdent)
    {
      
       
        var tableName;
        var tableBodyName =tbn;
        var ty = tableType;
        var h1 = header
        var d1 = data1;
        var d2 = data2;    
        var tI = taIdent
     

        // get the reference for the body
        var body = document.getElementsByTagName("body")[0];

        // creates a <table> element and a <tbody> element
        var tableName = document.getElementById(tableName);//get tableName

        var tableBodyName = document.createElement("tbody"); //Created table body 
        tableBodyName.setAttribute("id", tbn); //set table id
       // var tableBodyName = document.getElementById("resultTableBody");

        document.getElementById("lblCurrentyTable").innerHTML = tableType+tI; //table label indicator  

        //--------------Table Header -----------------------------------------
        var rowH = document.createElement("tr");

        for (var x = 0; x < cellNum; x++) {
            var head = document.createElement("th");
            head.setAttribute("id", "th" + 1 + "c" + x);
            var headText = document.createTextNode(h1[x]);

            head.appendChild(headText);
            rowH.appendChild(head);
        }
        tableBodyName.appendChild(rowH);
        //--------------End Table Header -----------------------------------------




        // creating all cells
        for (var i = 0; i < rowNum; i++) {
            // creates a table row
            var row = document.createElement("tr");
            row.setAttribute("id", "r" + i);
            if (i % 2) //is an even #? give COLOR to each row
            { } else { row.setAttribute("class", "info"); }

            // add the row to the end of the table body
            tableBodyName.appendChild(row);


            for (var j = 0; j < cellNum; j++)
            {
                //var row = docuoemnt.getComputedStyleElementById("r00");
                var cell = document.createElement("td");

                cell.setAttribute("id", "r" + i + "c" + j); //Created attribute of id for each cell

                var cellText;



                //-------School
                if (ty === "School")
                {                  
                    if (j === 0) {//j is to define cell location in the row
                        cellText = document.createTextNode(d1[i][0]);
                    }
                    if (j === 1) {
                        cellText = document.createTextNode(d1[i][1]);
                    }
                    if (j === 2) {
                        cellText = document.createTextNode(d1[i][2]);
                    }
                }

                //-------Building
                if (ty === "Building" || ty === "Room") {
                    if (j === 0) {
                        cellText = document.createTextNode(d1[i][0]);
                    }
                    if (j === 1) {
                        cellText = document.createTextNode(d1[i][1]);
                    }
                    if (j === 2) {
                        cellText = document.createTextNode(d1[i][2]);
                    }
                    if (j === 3) {//
                        cellText = document.createTextNode(d1[i][3]);
                    }
                    if (j === 4) {
                        cellText = document.createTextNode(d1[i][4]);
                    }
                    if (j === 5) {
                        cellText = document.createTextNode(d1[i][5]);
                    }
                    if (j === 6) {
                        cellText = document.createTextNode(d1[i][6]);
                    }
                }

                
                if (ty === "RoomSchedule")
                {                 
                        cellText = document.createTextNode(d1[j][i]);
                }
             

                //-----Table Type General Table-----------------------------------
                if (ty === "General") {//if its general table
                    if (d1[i][j] == true) //cell show calss title
                    {
                        cellText = document.createTextNode(d2[i]);
                    }
                    else if (d1[i][j] == false) { //cell show empty
                        cellText = document.createTextNode("");
                    }
                    else {
                        cellText = document.createTextNode(d1[i][j]);
                    }
                }
                //-----End Table Type General Table-----------------------------------
                tableName.appendChild(tableBodyName); // put the <tbody> in the <table>
                cell.appendChild(cellText);
                row.appendChild(cell);

            }

        }

    }



    $('#generalTable').on('click', function (event) {
        event.preventDefault(); // To prevent following the link (optional)
        deleteTab();
        displayGenTable();

    });




    $('#btnSchedule1').on('click', function (event)
    {    
        event.preventDefault(); // To prevent following the link (optional)
        deleteTab();
        displayGenTable();
        
    });






//==========================================Function Area=======================================================================
    function clearClassData()
    {
         genTableData = [];
         classTitle = [];
         classRange = [];
         classTime = [];

         schedSubject = [];
         schedCourseNum = [];
         scheFromAvail = [];
         schedToAvail = [];

         schedBuilding = [];
         schedRoomNum = [];

         schedMo = [];
         schedTu = [];
         schedWe = [];
         schedTh = [];
         schedFr = [];
         schedSa = [];

         schedStuNum = [];
         schedProjector = [];
         schedSmartboard = [];
         schedComputer = [];
         schedMediaCenter = [];
         schedSpec = [];

        //Empty object info
         localData = new Object;//object that store both class and room data
         localData = { items: [] };

         roomOut = new Object; //object that store roon data
         roomOut = { items: [] };

         classOut = new Object; //object that store class data
         classOut = { items: [] };
         

        //clear object contain Room data from database -----------
          roomPrimaryKeyArray = [];
          buildingArry = [];
          roomNumArry = [];
        //Clear all data in the PlugIn
          ClassList = [];
        //Clear data in the database
         

    }



    function getDataBaseData() {
        clearClassData();
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            localData.items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        for (var i = 0; i < localData.items.length; ++i)//Loop throght 
        {
            if (localData.items[i][1].objectKey === "room") {//find localData object that contain room data
                roomOut.items.push(localData.items[i]); //store calss data into roomOut object 
            }
            else if (localData.items[i][1].objectKey === "class") {//find localData object contain class data 
                classOut.items.push(localData.items[i]); //store calss data into classOut object 
            }
            else {
                console.log("LocalStorage is empty");
            }

        }
        for (var i = 0; i < roomOut.items.length; i++)
        {
            if (roomOut.items[i][2].building === "ADM")
            { admRoom.push(roomOut.items[i][3].roomNum);
              }
            if (roomOut.items[i][2].building === "TECH") {
                techRoom.push(roomOut.items[i][3].roomNum);
            }
            if (roomOut.items[i][2].building === "HUM") {
                humRoom.push(roomOut.items[i][3].roomNum);
            }
            if (roomOut.items[i][2].building === "SSB") {
                ssbRoom.push(roomOut.items[i][3].roomNum);
            }
            if (roomOut.items[i][2].building === "LRC") {
                lrcRoom.push(roomOut.items[i][3].roomNum);
            }
            if (roomOut.items[i][2].building === "FAB") {
                fabRoom.push(roomOut.items[i][3].roomNum);
            }
            if (roomOut.items[i][2].building === "VAB") {
                vabRoom.push(roomOut.items[i][3].roomNum);
            }
            if (roomOut.items[i][2].building === "CC") {
                ccRoom.push(roomOut.items[i][3].roomNum);
            }
            if (roomOut.items[i][2].building === "CDC") {
                cdcRoom.push(roomOut.items[i][3].roomNum);
            }
        }
    }


    function setPlugInData()
    {
        console.log("Schedule btn is click");

        //Sept 1 read data from data base----------------------------------------------------
     

        //End sept 1 read data from data base----------------------------------------------------


        //Sept 2 input data to PlugIn----------------------------------------------------
        //Both roomOut and classOut object must greater than 0
        if (roomOut.items.length <= 0 && classOut.items.length <= 0)
        {
            console.log("Both room and class data are missing !");
        }
        else if (roomOut.items <= 0) //roomOut object less or = to 0
        {
            console.log("Room data is missing");
        }
        else if (classOut.items <= 0)//classOut object less or = to 0
        {
            console.log("Class data is missing")
        }
        else//if no missing data set from both room and class
        {

            for (var i = 0; i < roomOut.items.length; i++) //Loop through the roomOut Object
            {//Write to Plug In addRoom()-------------------------------------------------------
                addRoom(roomOut.items[i][2].building,
                        roomOut.items[i][3].roomNum,
                        roomOut.items[i][4].stuCap,
                        roomOut.items[i][9].projector,
                        roomOut.items[i][8].smartBoard,
                        roomOut.items[i][6].computer,
                        roomOut.items[i][7].mediaCenter,
                        roomOut.items[i][5].spec);
              //  console.log(roomOut.items[i][2].building);
                roomPrimaryKeyArray[i] = roomOut.items[i][0].primaryKey;
                buildingArry[i] = roomOut.items[i][1].building;  //Find the value at [n][1]
                roomNumArry [i] = roomOut.items[i][3].roomNum;
            } console.log("room data has input to addRoom()");


            for (var i = 0; i < classOut.items.length; i++) //Loop through the calssOut Object
            {
                //Write to Plug In addClass()-------------------------------------------------------
                addClass(classOut.items[i][2].subject,
                         classOut.items[i][3].coursesNum,
                         classOut.items[i][4].credits,
                         classOut.items[i][5].monday,
                         classOut.items[i][6].tuesday,
                         classOut.items[i][7].wednesday,
                         classOut.items[i][8].thusday,
                         classOut.items[i][9].friday,
                         classOut.items[i][10].saturday,
                         classOut.items[i][11].availabilityFrom,
                         classOut.items[i][12].availabilityTo,
                         classOut.items[i][13].stuCap,
                         classOut.items[i][18].projector,
                         classOut.items[i][17].smartBoard,
                         classOut.items[i][15].computer,
                         classOut.items[i][16].mediaCenter,
                         classOut.items[i][14].spec
                           );
            } console.log("class data has input to addClass()");
            
            
        }
        schedule();//PlugIn Function call to schedule class
        //End sept 2 input data to PlugIn----------------------------------------------------
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
// roInfo, cInfo, hInfo, reInfo
// bootstrap_alert.notice('rInfo','title','message',200,0,4000,0,0);

//------------------------------------End Notification Box------------------------------------------------------------

//bootstrap_alert.notice('reInfo', 'Important:  ', 'You can view your schedule'
//   + 'information here', 200, 0, 4000, 0, 1);








    function minuteConver(t) // Formate minute 1450 to 1430
    {
        
        var s = t.toString();
        if (s.length < 4) {
            var p = s.substring(1, 3); //150
            if (p.indexOf('50') !== -1) // if string contain '50'
            {
                t = s.replace('50', '30'); //replace '50' to '30'
                return t;
            } else {
                return t;
            }
        }else
        {//>4
            var p = s.substring(2, 4); //1250
            if (p.indexOf('50') !== -1) // if string contain '50'
            {
                t = s.replace('50', '30'); //replace '50' to '30'
                return t;
            } else {
                return t;
            }
        }

    }


    function militTimeConver(mtime) //Formate 24 time to 12 time
    {//Convert time to string and put the string to differernt formate
        var t = minuteConver(mtime);

        var result;
        var sAve = 0;
        var emt = "";
        var sT = t;
        var nt = Number(t);
        var pm4 = sT;
        var pm5 = sT;
        var len = pm4.length;

        if (nt > 1259) {
            nt = nt - 1200;
            var pm4 = String(nt);
            var len = pm4.length; //get time length
            if (len < 4) { //add a zero if legth is less than 4 ex: 9:30
                pm4 = "0" + pm4;
            }
            if (pm4.substring(0, 1) == "0") {
                var hours = pm4.substring(1, 2);
            }
            else {
                var hours = pm4.substring(0, 2);
            }
            var mins = pm4.substring(2, 4);
            emt = "PM";
            if (hours == "12") {
                emt = "AM";
            }
            result = hours + ":" + mins + emt; //Formate 1
        }
        else if (nt > 1159) {
            var pm4 = String(nt);
            var len = pm4.length;
            var hours = pm4.substring(0, 2);
            var mins = pm4.substring(2, 4);
            emt = "PM";

            result = hours + ":" + mins + emt; //Formate 2

        } else { //AM Time
            if (len < 4)
            { pm4 = "0" + pm4; }

            if (pm4.substring(0, 1) == "0") {
                var hours = pm4.substring(1, 2);
            } else {
                var hours = pm4.substring(2, 0);
            }
            var mins = pm4.substring(2, 4);
            emt = "AM";
            if (pm5.substring(0, 2) == "00") {
                hours = "12";
            } 
            result = hours + ":" + mins + emt; //Formate 3
        }
        return result;
    }
       








//Delete underfind array or empty array

    function cleanArrayTool() {
        Array.prototype.clean = function (deleteValue) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == deleteValue) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };
    }

//==========================================End Function Area=======================================================================



    
    function roomPropertyFinder(roomNumber, builName) {

        var rn = roomNumber;
        /*
        0 Room Number
        1 Building Name
        2 Student #
        3 Spec
        4 Computer
        5 Media Center
        6 Smart Board
        7 Projector
        8 How many class is schedued in the room
        */
        var roomProperty = [];
        var roomFound = false;
        var roomIndexD = 0;
        var bn1 = builName;

        //search room in PlugIn
        var sc = 0; //room schedule counter
        for (var i = 0; i < ClassList.length; i++) {

            if (ClassList[i].roomNumScheduled === rn
                && ClassList[i].buildingScheduled===bn1) {
                sc++;
            }
        }
        roomProperty[8] = sc;


        //search room in Database
        for (var i = 0; i < roomOut.items.length; i++) {

            if (roomOut.items[i][3].roomNum === rn) {
                roomProperty [0] = roomNumber;
                roomProperty [1] = roomOut.items[i][2].building;
                roomProperty [2] = roomOut.items[i][4].stuCap;
                roomProperty [3] = roomOut.items[i][5].spec;
                roomProperty [4] = roomOut.items[i][6].computer;
                roomProperty [5] = roomOut.items[i][7].mediaCenter;
                roomProperty [6] = roomOut.items[i][8].smartBoard;
                roomProperty [7] = roomOut.items[i][9].projector;              
                roomFound = true;
                roomIndexD++;
                
            } 
            
        } if (roomFound === false)
        { console.log("Room does not exist"); }
        else {
            //console.log(roomIndexD + " #: " + rn + " room found.");
        }
        //roomOut.items[0][3].roomNum;
        //roomOut.items[1][3].roomNum;
        return roomProperty;
    }//Sample return: ["ADM", 23, "", false, false, false, false, 7]



    function classPropertyFinder(classNumber) {
        /*
    +  0   Class Number
    -  1   Building Name
    -  2   Room #
    +  3   Seat -req
    +  4   Duration 
    +  5   Smart Board  -req
    +  6   Projector -req
    +  7   Computer -req
    +  8   Media Center -req
    +  9   Credits
    +  10  Mon
    +  11  Tue
    +  12  Wen
    +  13  Thu
    +  14  Fri
    +  15  12 HR Time
    +  16  Is Schedule
        */
        var cn = classNumber;
        var isSchedule = false;
        var classProperty = [];


        for (var i = 0; i < ClassList.length; i++) {
            if (ClassList[i].courseNum === cn)
            {
     

                if (    ClassList[i].roomNumScheduled===""||
                        ClassList[i].buildingScheduled===""||
                        ClassList[i].rooScheduled==="")
                {
                    classProperty[0] = cn;
                    classProperty[1] = "";
                    classProperty[2] = "";      
                    classProperty[3] = ClassList[i].numSeats;

                    var dur = (ClassList[i].endAvailability - ClassList[i].beginAvailability) / 100;
                    classProperty[4] = dur

                    classProperty[5] = ClassList[i].smartboard;
                    classProperty[6] = ClassList[i].projector;
                    classProperty[7] = ClassList[i].computers;
                    classProperty[8] = ClassList[i].mediaCenter;
                    classProperty[9] = ClassList[i].creditHours;
                    classProperty[10] = ClassList[i].Mon;
                    classProperty[11] = ClassList[i].Tues;
                    classProperty[12] = ClassList[i].Wed;
                    classProperty[13] = ClassList[i].Thurs;
                    classProperty[14] = ClassList[i].Fri;
                    var nft12 = militTimeConver(ClassList[i].beginAvailability) +
                        "-" + militTimeConver(ClassList[i].endAvailability);
                    classProperty[15] = nft12;

                    

                } else
                {
                    classProperty[0] = cn;
                    classProperty[1] = ClassList[i].buildingScheduled;
                    classProperty[2] = ClassList[i].roomNumScheduled;
                    classProperty[3] = ClassList[i].numSeats;

                    var dur = (ClassList[i].endAvailability - ClassList[i].beginAvailability)/100;
                    classProperty[4] = dur

                    classProperty[5] = ClassList[i].smartboard;
                    classProperty[6] = ClassList[i].projector;
                    classProperty[7]  = ClassList[i].computers;
                    classProperty[8] = ClassList[i].mediaCenter;
                    classProperty[9] = ClassList[i].creditHours;
                    classProperty[10] = ClassList[i].Mon;
                    classProperty[11] = ClassList[i].Tues;
                    classProperty[12] = ClassList[i].Wed;
                    classProperty[13] = ClassList[i].Thurs;
                    classProperty[14] = ClassList[i].Fri;
                    var nft12 = militTimeConver(ClassList[i].beginAvailability) +
                        "-" + militTimeConver(ClassList[i].endAvailability);
                    classProperty[15] = nft12;

                    isSchedule = true;
                    
                }
                classProperty[16] = isSchedule;
                break;
            }
        }

        console.log(isSchedule);
        return classProperty;

    }

//2231111 f
//3232331 t



    function buildingTableLink ()
    {
        var id;
        var fid;
        var idN;
        for (var i = 0; i < btd.length; i++) {
            var temp = "r"+i+"c0"
            var idN = document.getElementById(temp).innerText;
            fid = "#" + temp;

            if (idN==="ADM")
            {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(admRL, "ADM" );
                    console.log("ADM Clicked");
                });
            }

            if (idN === "TECH") {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(techRL, "TECH");
                    console.log("TECH  Clicked");
                });
            }

            if (idN === "HUM") {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(humRL, "HUM");
                    console.log("HUM  Clicked");
                });
            }

            if (idN === "SSB") {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(ssbRL, "SSB");
                    console.log("SSB Clicked");
                });
            }

            if (idN === "LRC") {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(lrcRL, "LRC");
                    console.log("LRC Clicked");
                });
            }

            if (idN === "FAB") {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(fabRL, "FAB");
                    console.log("FAB Clicked");
                });
            }

            if (idN === "VAB") {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(vabRL, "VAB");
                    console.log("VAB Clicked");
                });
            }

            if (idN === "CC") {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(ccRL, "CC");
                    console.log("CC Clicked");
                });
            }

            if (idN === "CDC") {
                //Attached Listener
                $(fid).on('click', function (event) {
                    event.preventDefault(); // To prevent following the link (optional)
                    deleteTab();
                    displayBuildingTable(cdcRL, "CDC");
                    console.log("CDC Clicked");
                });
            }


        }
    }

// r0c0, r1c0, r3c0

    function deleteTab() {
        var elem = document.getElementById('resultTableBody');//Delete table by deleting the table body
        if (elem !== null) {//table body have to exist
            elem.parentNode.removeChild(elem);
            return false;
        }
    }

//detailTable


    $("#detailTable").on('click', function (event) {
        event.preventDefault(); // To prevent following the link (optional)
        deleteTab();
        displaySchoolTable();
        buildingTableLink();
    });


        function checkRoomScheduled(roomID) {

            //Make time table 
            function timeArrMaker() {//Sub function main 
                //1
                function tmt() {//Sub function
                    var tA = []; //Time without min

                    var tI = 700;
                    var c = 0;

                    for (var i = 0; i < 14; i++) {
                        tI = tI + 100
                        tA[i] = tI;

                    }
                    return tA;
                }//End Sub function

                //2
                function tmt2() {//Sub function
                    var tA = [];//Time with min

                    var tI = 700;
                    var c = 0;

                    for (var i = 0; i < 14; i++) {
                        tI = tI + 100;
                        var v = tI + 50;
                        tA[i] = v;

                    }
                    return tA;
                }//End Sub function

                //1+2

                var ft = [];


                var sft2 = [];
                var t1 = tmt();
                var t2 = tmt2();

                ft = t1.concat(t2);
                ft.sort(function (a, b) { return a - b });//sort time

                for (var i = 0; i < ft.length; i++) {
                    var temp = [];
                    temp[i] = ft[i] + "";
                    sft2[i] = militTimeConver(temp[i]);
                    console.log(ft.length);
                }
                return sft2;
            }//end sub function main


            var rID = roomID;
            var ro;
            var sO = [[]];
            var t = timeArrMaker();
            var rf1 = false;

            for (var i=0; i<  ScheduledRoomsList.length; i++)
            {
                if (rID === ScheduledRoomsList[i].roomID)
                {
                    console.log("room found at: " + rID)
                    ro = ScheduledRoomsList[i];
                    rf1 = true;
                    break;
                } else {
                    console.log("room: " + rID + " not found");
                }
            }
            if (rf1 === false) {
                roomNotFound();
            }

            
            sO = new Array(); //created 2D arry (arry inside of array)
            for (i = 0; i < ro.schedule.length; i++) {
                sO[i] = new Array(); //each row contain 7 cell 
            }

            sO.push(t); //time arry + scheduled day array
           

            for (var i = 0; i < ro.schedule.length; i++) {
                
                for (var j = 0; j < ro.schedule[i].length; j++) {
                    sO[i][j] = ro.schedule[i][j];
                }
            }
            return sO;

            console.log(sO);
        }






        function displayRoomScheduled(roomID) {
            var rI = roomID;
            var rD = checkRoomScheduled(rI);

            rD.reverse(); //reverse array index location !!!!

            var tID1 = ": " + rI;

            var header2 = ["Time", "Saturday", "Friday", "Tuesday", "Wednesday", "Thursday", "Monday"];

            var tableType2 = "RoomSchedule"
            console.log(rD);
            console.log(rD[6][1]);
            console.log(rD[0].length);
            tableGen("resultTable", "resultTableBody", tableType2, header2, rD[0].length,
            header2.length, rD, 0, tID1);//write data to Gena table

        }



//----------------------Search Input--------------------     
        var tSear;
        var txtSearch1 = document.getElementById('txtSearch');

        if (txtSearch1) {//if object is not null then addEventListener
            txtSearch1.addEventListener("input", haveTxtSearch) //checkBox StudentCapacity
            function haveTxtSearch() {
                roomIdDash();
                tSear = (txtSearch1.value).allCapitalize();  //to all cap         
                //console.log(tSear);
            }
        }


        $("#btnSearch").on('click', function (event) {
            event.preventDefault(); // To prevent following the link (optional)
            deleteTab();
            displayRoomScheduled(tSear);

        });




//---------------------------Auto Dash-------------------------------
        function roomIdDash() {
            searchNum = txtSearch1.value;
            //console.log(coursesNum);

            if (searchNum.charAt(3) != "-") //if user enter courses# at char 4 does not contain -
            {
                if (searchNum.length > 3) //if user enter courses# length is greater than 4
                {
                    //inseart index function
                    String.prototype.splice = function (idx, rem, str) {
                        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
                    };
                    var result = searchNum.splice(3, 0, "-"); //call function insear - at index location 3
                    document.getElementById("txtSearch").value = result //display the result back to the HTML
                }
            }

        }//End EvenListener


    
//---------------------------------All Cap-------------------------------
        function allCapitalize(string) {
            return string.toUpperCase() + string.slice(9999);
        }
        String.prototype.allCapitalize = function () {
            return this.toUpperCase() + this.slice(9999);
        }