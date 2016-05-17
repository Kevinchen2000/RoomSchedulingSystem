
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//begin code for classes
	//create object to store class information, object is called course to prevent confusion since "class" is a keyword
	function course(subject, courseNum, creditHours, Mon, Tues, Wed, Thurs, Fri, Sat, beginAvailability, endAvailability, numSeats, projector, smartboard, computers, mediaCenter, specialty)
	{
		this.subject = subject;
		this.courseNum = courseNum;
		this.courseID = this.subject + "-" + this.courseNum;
		this.creditHours = creditHours;
		this.Mon = Mon;
		this.Tues = Tues;
		this.Wed = Wed;
		this.Thurs = Thurs;
		this.Fri = Fri;
		this.Sat = Sat;
		this.beginAvailability = beginAvailability;
		this.endAvailability = endAvailability;
		this.totalAvailability = this.endAvailability - this.beginAvailability;
		this.numSeats = numSeats;
		this.projector = projector;
		this.smartboard = smartboard;
		this.computers = computers;
		this.mediaCenter = mediaCenter;
		this.specialty = specialty;
		this.roomScheduled = "";
		this.buildingScheduled = "";
		this.roomNumScheduled = "";
		this.timeScheduledStart = -999;
		this.timeScheduledEnd = -999;
		this.numAttributes = 0;
		
		//if statements used to count the number of attributes, used for determining priority
		if(this.projector == true){this.numAttributes++;}
		
		if(this.smartboard == true){this.numAttributes++;}
		
		if(this.computers == true){this.numAttributes++;}
		
		if(this.mediaCenter == true){this.numAttributes++;}
		
	}//end of object course

		
	//create a method to add courses to the ClassList
	function addClass(subject, courseNum, creditHours, Mon, Tues, Wed, Thurs, Fri, Sat, beginAvailability, endAvailability, numSeats, projector, smartboard, computers, mediaCenter, specialty)
	{
		tempClass = new course(subject, courseNum, creditHours, Mon, Tues, Wed, Thurs, Fri, Sat, beginAvailability, endAvailability, numSeats, projector, smartboard, computers, mediaCenter, specialty);
		
		if(tempClass.subject.localeCompare("CPT") == 0 || tempClass.subject.localeCompare("CPM") == 0 || tempClass.subject.localeCompare("CPC") == 0 || tempClass.subject.localeCompare("BUS") == 0
			|| tempClass.subject.localeCompare("BTC") == 0 || tempClass.subject.localeCompare("CDM") == 0 || tempClass.subject.localeCompare("ETC") == 0)
		{
			Tech_Classes.push(tempClass);
		}
		else if(tempClass.subject.localeCompare("GEO") == 0 || tempClass.subject.localeCompare("HIS") == 0 || tempClass.subject.localeCompare("PSY") == 0 || tempClass.subject.localeCompare("ANT") == 0
			|| tempClass.subject.localeCompare("CRJ") == 0 || tempClass.subject.localeCompare("PHL") == 0 || tempClass.subject.localeCompare("POL") == 0 || tempClass.subject.localeCompare("SOC") == 0)
		{
			SSB_Classes.push(tempClass);
		}
		else if(tempClass.subject.localeCompare("SPE") == 0 || tempClass.subject.localeCompare("ENG") == 0 || tempClass.subject.localeCompare("arb") == 0 || tempClass.subject.localeCompare("COL") == 0
			|| tempClass.subject.localeCompare("COM") == 0 || tempClass.subject.localeCompare("ESL") == 0 || tempClass.subject.localeCompare("frn") == 0 || tempClass.subject.localeCompare("GRM") == 0
			 || tempClass.subject.localeCompare("LIT") == 0)
		{
			Hum_Classes.push(tempClass);
		}
		else if(tempClass.subject.localeCompare("MAT") == 0 || tempClass.subject.localeCompare("CHM") == 0 || tempClass.subject.localeCompare("ACT") == 0 || tempClass.subject.localeCompare("BIO") == 0
			|| tempClass.subject.localeCompare("ECO") == 0 || tempClass.subject.localeCompare("EGR") == 0)
		{
			ADM_Classes.push(tempClass);
		}
		else if(tempClass.subject.localeCompare("MUS") == 0 || tempClass.subject.localeCompare("THE") == 0)
		{
			FAB_Classes.push(tempClass);
		}
		else if(tempClass.subject.localeCompare("ART") == 0)
		{
			VAB_Classes.push(tempClass);
		}
		else if(tempClass.subject.localeCompare("CDC") == 0 || tempClass.subject.localeCompare("EDU") == 0)
		{
			CDC_Classes.push(tempClass);
		}
		
		ClassList.push(tempClass);
	}
	
	
	
	//method that will be used to sort the ClassList, it will call other sorts as appropriate
	function sortClasses(array, left, right)
	{
		classAttributesSelectionSort(array, left, right);
		classAvailabilityInsertionSort(array, left, right);
	}//end sortClasses
	
	
	//sorts the classList based on totalAvailability
	function classAvailabilityInsertionSort(array, left, right)
	{
		var leftPointer = left;
		while(leftPointer < right + 1)
		{
			var rightPointer = leftPointer;
			while(rightPointer > left && array[rightPointer].totalAvailability < array[rightPointer - 1].totalAvailability)
			{
				var objectTemp = array[rightPointer];
				array[rightPointer] = array[rightPointer - 1];
				array[rightPointer - 1] = objectTemp;
				rightPointer--;
			}
			leftPointer++;
		}
	}//end classAvailabilityInsertionSort
	
	
	//sort based on number of attributes
	function classAttributesSelectionSort(array, left, right)
	{
		var leftPointer = left;
		var rightPointer = left + 1;//start pointers on different values
		while(leftPointer < right){//move pointer through
			var temp = rightPointer;
			while(rightPointer <= right){
				if(array[rightPointer].numAttributes > array[temp].numAttributes)
				{
					temp = rightPointer
				}//end if
				rightPointer++;
			}//end while
			if(array[leftPointer].numAttributes < array[temp].numAttributes)
			{
				var objectTemp = array[leftPointer];
				array[leftPointer] = array[temp];
				array[temp] = objectTemp;
			}//end if
			leftPointer++;
			rightPointer = leftPointer + 1;
		}//end while
	}//end classAttributesSelectionSort
	
	function findScheduledClass(courseID)
		{
		var i = 0;
		var found = false;
		while(i < ScheduledClassList.length)
			{
			if(ScheduledClassList[i].courseID.localeCompare(courseID) == 0)
				{
				found = true;
				break;
				}
			else
				{i++}
			}//end while
		if(found == true)
			{
			var returnString = ScheduledClassList[i].courseID + "|" + ScheduledClassList[i].subject + "|" + ScheduledClassList[i].courseNum
			+ "|" + ScheduledClassList[i].creditHours + "|" + ScheduledClassList[i].Mon
			+ "|" + ScheduledClassList[i].Tues + "|" + ScheduledClassList[i].Wed + "|" + ScheduledClassList[i].Thurs
			+ "|" + ScheduledClassList[i].Fri + "|" + ScheduledClassList[i].Sat  + "|" + ScheduledClassList[i].beginAvailability
			+ "|" + ScheduledClassList[i].endAvailability + "|" + ScheduledClassList[i].totalAvailability
			+ "|" + ScheduledClassList[i].numSeats + "|" + ScheduledClassList[i].projector + "|" + ScheduledClassList[i].smartboard
			+ "|" + ScheduledClassList[i].computers + "|" + ScheduledClassList[i].mediaCenter + "|" + ScheduledClassList[i].specialty
			+ "|" + ScheduledClassList[i].roomScheduled + "|" + ScheduledClassList[i].timeScheduledStart
			+ "|" + ScheduledClassList[i].timeScheduledEnd + "|" + ScheduledClassList[i].numAttributes;
			}
			//the return string order is CourseID, subject, courseNum, creditHours, Mon, Tues, Wed, Thurs, Fri, Sat, beginAvailability, endAvailability
			//totalAvailability, numSeats, projector, smartboard, computers, mediaCenter, specialty, roomScheduled, timeScheduledStart, timeScheduledEnd numAttributes
		else
			{
			var returnString = "Class not found";
			}
		return returnString;
		}//end findScheduledClass
	
	
//end code for classes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//start code for rooms

	//create object to store room information
	function room(building, roomNum, numSeats, projector, smartboard, computers, mediaCenter, specialty)
	{
		//declarations
		this.building = building;
		this.roomNum = roomNum;
		this.roomID = this.building + "-" + this.roomNum;
		this.numSeats = numSeats;
		this.projector = projector;
		this.smartboard = smartboard;
		this.computers = computers;
		this.mediaCenter = mediaCenter;
		this.specialty = specialty;
		this.numAttributes = 0;
		this.numClassesScheduled = 0;
		this.schedule = new Array(6);//initialize the array
		
		//fill the array with arrays (creating a 2d array)
		for(var i = 0; i < 6; i++)
		{
		this.schedule[i] = new Array(28)
		}
		
		//populate the whole 2d array with empty strings ("")
		for(var i = 0; i < 6; i++)
			{
			for(var j = 0; j < 28; j++)
				{
					this.schedule[i][j] = "";
				}			
			}
			
		if(this.projector == true){this.numAttributes++;}
		
		if(this.smartboard == true){this.numAttributes++;}
		
		if(this.computers == true){this.numAttributes++;}
		
		if(this.mediaCenter == true){this.numAttributes++;}
		
	}//end room object
	
	function addRoom(building, roomNum, numSeats, projector, smartboard, computers, mediaCenter, specialty)
	{
		tempRoom = new room(building, roomNum, numSeats, projector, smartboard, computers, mediaCenter, specialty);
		//RoomList.push(tempRoom);
		
			if(tempRoom.building.localeCompare("ADM") == 0)
			{
			   ADM_Rooms.push(tempRoom);
			}
			else if(tempRoom.building.localeCompare("TECH") == 0)
			{
			   Tech_Rooms.push(tempRoom);
			}
			else if(tempRoom.building.localeCompare("SSB") == 0)
			{
			   SSB_Rooms.push(tempRoom);
			}
			else if(tempRoom.building.localeCompare("HUM") == 0)
			{
			   Hum_Rooms.push(tempRoom);
			}
			else if(tempRoom.building.localeCompare("LRC") == 0)
			{
			   LRC_Rooms.push(tempRoom);
			}
			else if(tempRoom.building.localeCompare("FAB") == 0)
			{
			   FAB_Rooms.push(tempRoom);
			}
			else if(tempRoom.building.localeCompare("VAB") == 0)
			{
			   VAB_Rooms.push(tempRoom);
			}
			else if(tempRoom.building.localeCompare("CC") == 0)
			{
			CC_Rooms.push(tempRoom);
			}
			else if(tempRoom.building.localeCompare("CDC") == 0)
			{
			CDC_Rooms.push(tempRoom);
			}
		
		RoomList.push(tempRoom);
		
	}
	
	//sort rooms by number of attributes
	function roomAttributesSelectionSort(array, left, right)
	{
		var leftPointer = left;
		var rightPointer = left + 1;//start pointers on different values
		while(leftPointer < right){//move pointer through
			var temp = rightPointer;
			while(rightPointer <= right){
				if(array[rightPointer].numAttributes < array[temp].numAttributes)
				{
					temp = rightPointer
				}//end if
				rightPointer++;
			}//end while
			if(array[leftPointer].numAttributes > array[temp].numAttributes)
			{
				var objectTemp = array[leftPointer];
				array[leftPointer] = array[temp];
				array[temp] = objectTemp;
			}//end if
			leftPointer++;
			rightPointer = leftPointer + 1;
		}//end while
	}//end RoomAttributesSelectionSort
	
	
	
//end code for rooms
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//start code for scheduling
function ScheduleClasses(ClassList, ScheduledClassList, UnscheduledClassList, RoomList, ScheduledRoomList, UnscheduledRoomList)
	{
	//declarations
	var classCounter;
	var roomCounter;
	var compatible;
	var canFit;
	var indexBeginAvailability;
	var indexEndAvailability;
	var indexClassLength;
	var indexDay;
	var indexTime;
	var open;
	//end declarations
	
	sortClasses(ClassList, 0, ClassList.length - 1);															//sort the classes before scheduling
	roomAttributesSelectionSort(RoomList, 0, RoomList.length - 1);												//sort the rooms before scheduling
	
	while(ClassList.length > 0 && RoomList.length > 0)																					//while there are still classes to schedule
		{
		
		classCounter = 0;
		roomCounter = 0;
		
		while(classCounter < ClassList.length)																	//while the classcounter is in the bounds of the ClassList
			{
			compatible = true;
			if(checkAttributes(ClassList[classCounter], RoomList[roomCounter]))									//call method to check if the room has the required attributes to hold the class
				{}																								//if true do nothing
			else
				{compatible = false;}//end else																	//if false set compatible to false
			if(compatible == true)
				{
				indexBeginAvailability = timeToIndex(ClassList[classCounter].beginAvailability);
				indexEndAvailability = timeToIndex(ClassList[classCounter].endAvailability);
				indexClassLength = determineClassLength(ClassList[classCounter]);
				canFit = true;
				indexDay = 0;
				indexTime = indexBeginAvailability;
				while(indexTime < RoomList[roomCounter].schedule[indexDay].length 
				&& (indexTime + indexClassLength) < RoomList[roomCounter].schedule[indexDay].length)//note: different condition than diagram, not sure why diagram is set the way it is
					{
					open = true;																				//open starts as true until proven false
					indexDay = 0;																				//make sure to start on the first day
					while(indexDay < RoomList[roomCounter].schedule.length)										//while loop through the days of the week excluding Sunday
						{
						if(indexDay == 0 && ClassList[classCounter].Mon == true)								//if loop is on Monday and the class is held on Mondays
							{
							if(RoomList[roomCounter].schedule[indexDay][indexTime].localeCompare("") == 0)		//check to see if the current time block is empty
								{
								for(i = 0; i < indexClassLength && indexTime + i < 
									RoomList[roomCounter].schedule[indexDay].length; i++)						//loop through future time blocks to see if their are
									{																			//enough contiguous time blocks to hold the class
									if(RoomList[roomCounter].schedule[indexDay][indexTime + i].localeCompare("") == 0)			//check to see if the time block is empty
										{}																		//if the block is empty do nothing
									else
										{open = false;}															//if the time block is not empty set open to false
									}//end for i < indexClassLength
								}//end if Roomlist[roomCounter]....
							else
								{open = false;}																	//if the time block is not empty set open to false
							}//end if index day == 0
							
							
							
						if(indexDay == 1 && ClassList[classCounter].Tues == true)
							{
							if(RoomList[roomCounter].schedule[indexDay][indexTime].localeCompare("") == 0)		//check to see if the current time block is empty
								{
								for(i = 0; i < indexClassLength && indexTime + i < 
									RoomList[roomCounter].schedule[indexDay].length; i++)						//loop through future time blocks to see if their are
									{																			//enough contiguous time blocks to hold the class
									if(RoomList[roomCounter].schedule[indexDay][indexTime + i].localeCompare("") == 0)			//check to see if the time block is empty
										{}																		//if the block is empty do nothing
									else
										{open = false;}															//if the time block is not empty set open to false
									}//end for i < indexClassLength
								}//end if Roomlist[roomCounter]....
							else
								{open = false;}																	//if the time block is not empty set open to false
								}//end if index day == 1
								
								
								
						if(indexDay == 2 && ClassList[classCounter].Wed == true)
							{
							if(RoomList[roomCounter].schedule[indexDay][indexTime].localeCompare("") == 0)		//check to see if the current time block is empty
								{
								for(i = 0; i < indexClassLength && indexTime + i < 
									RoomList[roomCounter].schedule[indexDay].length; i++)						//loop through future time blocks to see if their are
									{																			//enough contiguous time blocks to hold the class
									if(RoomList[roomCounter].schedule[indexDay][indexTime + i].localeCompare("") == 0)			//check to see if the time block is empty
										{}																		//if the block is empty do nothing
									else
										{open = false;}															//if the time block is not empty set open to false
									}//end for i < indexClassLength
								}//end if Roomlist[roomCounter]....
							else
								{open = false;}																	//if the time block is not empty set open to false
								}//end if index day == 2
								
								
								
						if(indexDay == 3 && ClassList[classCounter].Thurs == true)
							{
							if(RoomList[roomCounter].schedule[indexDay][indexTime].localeCompare("") == 0)		//check to see if the current time block is empty
								{
								for(i = 0; i < indexClassLength && indexTime + i < 
									RoomList[roomCounter].schedule[indexDay].length; i++)						//loop through future time blocks to see if their are
									{																			//enough contiguous time blocks to hold the class
									if(RoomList[roomCounter].schedule[indexDay][indexTime + i].localeCompare("") == 0)			//check to see if the time block is empty
										{}																		//if the block is empty do nothing
									else
										{open = false;}															//if the time block is not empty set open to false
									}//end for i < indexClassLength
								}//end if Roomlist[roomCounter]....
							else
								{open = false;}																	//if the time block is not empty set open to false
								}//end if index day == 3
								
								
								
						if(indexDay == 4 && ClassList[classCounter].Fri == true)
							{
							if(RoomList[roomCounter].schedule[indexDay][indexTime].localeCompare("") == 0)		//check to see if the current time block is empty
								{
								for(i = 0; i < indexClassLength && indexTime + i < 
									RoomList[roomCounter].schedule[indexDay].length; i++)						//loop through future time blocks to see if their are
									{																			//enough contiguous time blocks to hold the class
									if(RoomList[roomCounter].schedule[indexDay][indexTime + i].localeCompare("") == 0)			//check to see if the time block is empty
										{}																		//if the block is empty do nothing
									else
										{open = false;}															//if the time block is not empty set open to false
									}//end for i < indexClassLength
								}//end if Roomlist[roomCounter]....
							else
								{open = false;}																	//if the time block is not empty set open to false
								}//end if index day == 4
								
								
								
						if(indexDay == 5 && ClassList[classCounter].Sat == true)
							{
							if(RoomList[roomCounter].schedule[indexDay][indexTime].localeCompare("") == 0)		//check to see if the current time block is empty
								{
								for(i = 0; i < indexClassLength && indexTime + i < 
									RoomList[roomCounter].schedule[indexDay].length; i++)						//loop through future time blocks to see if their are
									{																			//enough contiguous time blocks to hold the class
									if(RoomList[roomCounter].schedule[indexDay][indexTime + i].localeCompare("") == 0)			//check to see if the time block is empty
										{}																		//if the block is empty do nothing
									else
										{open = false;}															//if the time block is not empty set open to false
									}//end for i < indexClassLength
								}//end if Roomlist[roomCounter]....
							else
								{open = false;}																	//if the time block is not empty set open to false
								}//end if index day = 5
						
						indexDay++;
						}//end while index day < roomList
						if(open == true)																		//if open is true the class is able to be scheduled
							{
							ClassList[classCounter].roomScheduled = RoomList[roomCounter].roomID;				//Save the roomID the class is scheduled in into the class object
							ClassList[classCounter].buildingScheduled = RoomList[roomCounter].building;
							ClassList[classCounter].roomNumScheduled = RoomList[roomCounter].roomNum;
							ClassList[classCounter].timeScheduledStart = indexTime;								//Save the time the class starts into the class object
							ClassList[classCounter].timeScheduledEnd = indexTime + indexClassLength - 1;		//Save the time the class ends into the class object
							RoomList[roomCounter].numClassesScheduled++
							
							if(ClassList[classCounter].Mon == true)												//if the class is held on Monday schedule the class into the room for that day
								{
								for(i = 0; i < indexClassLength; i++)
									{
										RoomList[roomCounter].schedule[0][indexTime + i] = ClassList[classCounter].courseID;
									}//end for i < indexClassLength
								}//end if Mon == true
							if(ClassList[classCounter].Tues == true)											//if the class is held on Tuesday schedule the class into the room for that day
								{
								for(i = 0; i < indexClassLength; i++)
									{
										RoomList[roomCounter].schedule[1][indexTime + i] = ClassList[classCounter].courseID;
									}//end for i < indexClassLength
								}//end if Tues == true
							if(ClassList[classCounter].Wed == true)												//if the class is held on Wednesday schedule the class into the room for that day
								{
								for(i = 0; i < indexClassLength; i++)
									{
										RoomList[roomCounter].schedule[2][indexTime + i] = ClassList[classCounter].courseID;
									}//end for i < indexClassLength
								}//end if Wed == true
							if(ClassList[classCounter].Thurs == true)											//if the class is held on Thursday schedule the class into the room for that day
								{
								for(i = 0; i < indexClassLength; i++)
									{
										RoomList[roomCounter].schedule[3][indexTime + i] = ClassList[classCounter].courseID;
									}//end for i < indexClassLength
								}//end if Thurs == true
							if(ClassList[classCounter].Fri == true)												//if the class is held on Friday schedule the class into the room for that day
								{
								for(i = 0; i < indexClassLength; i++)
									{
										RoomList[roomCounter].schedule[4][indexTime + i] = ClassList[classCounter].courseID;
									}//end for i < indexClassLength
								}//end if Fri == true
							if(ClassList[classCounter].Sat == true)												//if the class is held on Saturday schedule the class into the room for that day
								{
								for(i = 0; i < indexClassLength; i++)
									{
										RoomList[roomCounter].schedule[5][indexTime + i] = ClassList[classCounter].courseID;
									}//end for i < indexClassLength
								}//end if Sat == true
							//document.write("class " + ClassList[classCounter].courseID + " scheduled, remove from list <br>");
							ScheduledClassList.push(ClassList[classCounter]);
							ClassList.splice(classCounter, 1);
							//document.write(ClassList.length + "<br>");
							indexDay = 0;
							break;
							}//end if open = true
						else
							{
								indexDay = 0;
								indexTime++
							}
					}//end while index time < roomList
					//break leads here
				}//end if compatible = true
			if(open == false || compatible == false)
				{classCounter++}
			//else
			//	{classCounter++}																				//if not compatible move on to the next class
			}// while end classCounter < ClassList.length
		//document.write("room " + RoomList[roomCounter].roomID + " scheduled, remove from list <br>");
		ScheduledRoomList.push(RoomList[roomCounter]);															//copy the current room into the scheduled room list
		RoomList.splice(roomCounter, 1);																		//remove the current room from the room list
		//document.write(RoomList.length + " rooms left <br>");
		
		}//end while ClassList.length > 0 && RoomList.length > 0
	
	for (i = 0; i < RoomList.length; i++)
		{
			UnscheduledRoomList.push(RoomList[i]);
		}
	for (i = 0; i < ClassList.length; i++)
		{
			UnscheduledClassList.push(ClassList[i]);
		}
	
	
	}//end ScheduleClasses

	
	//function checks if the room has all the requirements to hold the class
function checkAttributes(course, room)
	{
	var compatible = true;																						//condition starts as true, if any attribute is not met change it to false
	if(course.numSeats > room.numSeats)
		{
			return compatible = false;
		}

	if(course.projector == true && room.projector != true)
		{
			return compatible = false;
		}//end if course.projector = true
	if(course.smartboard == true && room.smartboard != true)
		{
			return compatible = false;
		}//end if course.smartboard = true
	if(course.computers == true && room.computers != true)
		{
			return compatible = false;
		}//end if course.computers = true
	if(course.mediaCenter == true && room.mediaCenter != true)
		{
			return compatible = false;
		}//end if mediacenter = true
	/*Will we allow classes that are not specialized into specialization classrooms?*/
	
	return compatible;
	}//end checkAttributes

	
function timeToIndex(armyTime)
	{
	var minutes = armyTime % 100;																				//determine minutes
	var hour = (armyTime - minutes) / 100;																		//determine hour
	var index = (hour - 8) * 2;																					//index 0 is 8:00am so minus 8 then multiply by 2 because of 30 minute time blocks
	if(minutes >= 30){index++}																					//if minutes is greater than 30 it goes to the next time block
	return index;
	}//end timeToIndex

function determineClassLength(course)
	{
	//declarations
	var NumDays = 0;
	var time = course.creditHours * 60;																				//how many minutes total?
	var extraMinutes;
	var lengthMinutes;
	var indexClassLength;
	
	//determine the number of days the class is held
	if(course.Mon == true){NumDays++}
	if(course.Tues == true){NumDays++}
	if(course.Wed == true){NumDays++}
	if(course.Thurs == true){NumDays++}
	if(course.Fri == true){NumDays++}
	if(course.Sat == true){NumDays++}
	
	//begin calculations
	lengthMinutes = time / NumDays;																				//length of class is credit hours / number of days the class is held
	extraMinutes = lengthMinutes % 30;																			//schedule is in 30 minute blocks, if the lengthminutes is not evenly divisible by 30
																												//how many extra minutes are left over?
	indexClassLength = (lengthMinutes - extraMinutes) / 30;														//indexClassLength = number of 30 minute blocks it needs, devide by 30
	if(extraMinutes > 0){indexClassLength++}																	//if there are extra minutes the class will need one more block
	return indexClassLength;																					//return
	}


//end code for scheduling
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//start callable schedule function
function schedule()
	{
	ScheduleClasses(Tech_Classes, ScheduledClassList, UnscheduledClassList, Tech_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	ScheduleClasses(ADM_Classes, ScheduledClassList, UnscheduledClassList, ADM_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	ScheduleClasses(Hum_Classes, ScheduledClassList, UnscheduledClassList, Hum_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	ScheduleClasses(SSB_Classes, ScheduledClassList, UnscheduledClassList, SSB_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	ScheduleClasses(LRC_Classes, ScheduledClassList, UnscheduledClassList, LRC_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	ScheduleClasses(FAB_Classes, ScheduledClassList, UnscheduledClassList, FAB_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	ScheduleClasses(VAB_Classes, ScheduledClassList, UnscheduledClassList, VAB_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	ScheduleClasses(CC_Classes, ScheduledClassList, UnscheduledClassList, CC_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	ScheduleClasses(CDC_Classes, ScheduledClassList, UnscheduledClassList, CDC_Rooms, ScheduledRoomsList, UnscheduledRoomList);
	}

//end callable schedule function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//start script main





	//create arrays to hold classes and rooms
	var ClassList = []
	var ScheduledClassList = []
	var UnscheduledClassList = []
	var RoomList = []
	var ScheduledRoomsList = []
	var UnscheduledRoomList = []
	var ADM_Rooms = []
	var Tech_Rooms = []
	var Hum_Rooms = []
	var SSB_Rooms = []
	var LRC_Rooms = []
	var FAB_Rooms = []
	var VAB_Rooms = []
	var CC_Rooms = []
	var CDC_Rooms = []
	
	var ADM_Classes = []
	var Tech_Classes = []
	var Hum_Classes = []
	var SSB_Classes = []
	var LRC_Classes = []
	var FAB_Classes = []
	var VAB_Classes = []
	var CC_Classes = []
	var CDC_Classes = []
/*	
	for(i = 0; i < 100; i++)
		{
		var subject;
		var creditHours;
		var Mon = false;
		var Tues = false;
		var Wed = false;
		var Thurs = false;
		var Fri = false;
		var Sat = false;
		var dayAssigned = false;
		var beginAvailability;
		var endAvailability;
		var numSeats;
		var computers = true;
		var projector = true;
		var smartboard = true;
		var mediaCenter = true;
		var specialty = "";
		
		var number = Math.floor(Math.random()*(10 - 0 + 1) + 0);
		switch(number)
			{
			case 0:
				subject = "cpt";
				break;
			case 1:
				subject = "cpm";
				break;
			case 2:
				subject = "cpc";
				break;
			case 3:
				subject = "geo";
				break;
			case 4:
				subject = "his";
				break;
			case 5:
				subject = "psy";
				break;
			case 6:
				subject = "spe";
				break;
			case 7:
				subject = "eng";
				break;
			case 8:
				subject = "mat";
				break;
			case 9:
				subject = "chm";
				break;
			case 10:
				subject = "phy";
				break;
			default:
				subject = "cpt";
			}//end switch
		
		creditHours = Math.floor(Math.random()*(5 - 1 + 1) + 1);
		while(dayAssigned == false)
			{
			if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
				{Mon = true; dayAssigned = true;}
			if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
				{Tues = true; dayAssigned = true;}
			if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
				{Wed = true; dayAssigned = true;}
			if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
				{Thurs = true; dayAssigned = true;}
			if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
				{Fri = true; dayAssigned = true;}
			if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
				{Sat = true; dayAssigned = true;}
			}
		
		number = Math.floor(Math.random()*(6 - 1 + 1) + 1);
		switch(number)
			{
			case 1:
				beginAvailability = 800;
				break;
			case 2:
				beginAvailability = 800;
				break;
			case 3:
				beginAvailability = 900;
				break;
			case 4:
				beginAvailability = 1000;
				break;
			case 5:
				beginAvailability = 1030;
				break;
			case 6:
				beginAvailability = 1130;
				break;
			default:
				beginAvailability = 800;
			}//end switch
		number = Math.floor(Math.random()*(6 - 1 + 1) + 1);
		switch(number)
			{
			case 1:
				endAvailability = 1200;
				break;
			case 2:
				endAvailability = 1400;
				break;
			case 3:
				endAvailability = 1600;
				break;
			case 4:
				endAvailability = 1830;
				break;
			case 5:
				endAvailability = 2000;
				break;
			case 6:
				endAvailability = 2200;
				break;
			default:
				endAvailability = 2200;
			
			}//end switch
			
		numSeats = Math.floor(Math.random()*(30 - 20 + 1) + 20);
		
		if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
			{computers = false;}
		if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
			{projector = false;}
		if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
			{smartboard = false;}
		if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
			{mediaCenter = false;}
		
		addClass(subject, i, creditHours, Mon, Tues, Wed, Thurs, Fri, Sat, beginAvailability, endAvailability, numSeats, computers, projector, smartboard, mediaCenter, "");
		}
		
		
		
		
		for(i = 0; i < 100; i++)
		{
		var building;
		var numSeats;
		var computers = true;
		var projector = true;
		var smartboard = true;
		var mediaCenter = true;
		
		var number = number = Math.floor(Math.random()*(4 - 1 + 1) + 1);
		switch(number)
			{
			case 1:
				building = "adm";
				break;
			case 2:
				building = "tech";
				break;
			case 3:
				building = "ssb";
				break;
			case 4:
				building = "hum";
				break;
			default:
				building = "tech";			
			}
		
		numSeats = Math.floor(Math.random()*(30 - 20 + 1) + 20);
		
		if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
			{computers = false;}
		if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
			{projector = false;}
		if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
			{smartboard = false;}
		if((Math.floor(Math.random()*(10 - 0 + 1) + 0)) % 2 == 0)
			{mediaCenter = false;}
			
		addRoom(building, i, numSeats, computers, projector, smartboard, mediaCenter, "");
		}
		
		
		
		schedule()
		
		*/
	
	
	
