import "errors.sol";
import "event_tracker.sol";
import "containers.sol";

contract ShipInfo is Errors, EventTracker  {

        string registrationId;
        string name;
        address[] containerInfo;
        address owner;
	      history eventHistoryShip;
        string origin;
        string destination;

   function removeContainerInfo (uint index) returns (uint retval) {

	if (index >  containerInfo.length) {
	   retval = PARAMETER_ERROR;
           return;
        }
	address container =  containerInfo[index];
	if (index >= containerInfo.length) return;
	for (uint i = index; i< containerInfo.length-1; i++){
             containerInfo[i] =  containerInfo[i+1];
        }
        delete containerInfo[containerInfo.length-1];
        containerInfo.length--;
	addEvent (eventHistoryShip, ACTION_UNLOAD, FROM, OBJ_SHIP, address (this), OBJ_CONTAINER, container);
	 ContainerInfo cInfo = ContainerInfo (container);
	 cInfo.addEventContainerHistory (ACTION_UNLOAD, FROM, OBJ_SHIP, address (this), OBJ_CONTAINER, container);
	retval = NO_ERROR;
	return;
   } 

   function getContainerInfoIndex (address container)  returns (int retval) {
	 for (uint i = 0; i< containerInfo.length-1; i++){
	    address cinfoAdr = address (containerInfo[i]);
	    if (container == cinfoAdr ) {
		retval = int (i);
		return;
	    } 
         }
	retval = -1; 
	return ;	
   }

   function deletetContainerInfoWithAddress (address container)  returns (uint retval) {

	int index = getContainerInfoIndex (container);

        if (index != -1) {
	    retval = RESOURCE_NOT_FOUND;	
	    return;
	}

       retval = removeContainerInfo (uint(index)) ;
 	return retval;
   }


   function ShipInfo (  string registrationIdP,string nameP,address ownerP,string originP, string destinationP) {
	     registrationId = registrationIdP;
	     owner = ownerP;
       name = nameP;
       origin = originP;
       destination = destinationP;
   }

   function getId () returns (string registrationId) {
	return registrationId;
   }

   function addContainerInfo (address container ) {

       addEvent (eventHistoryShip, ACTION_LOAD, TO, OBJ_CONTAINER, container, OBJ_SHIP, address (this));
       containerInfo.push (container);
       ContainerInfo cInfo = ContainerInfo (container);
       cInfo.addEventContainerHistory (ACTION_LOAD, TO, OBJ_CONTAINER, container, OBJ_SHIP, address (this)); 
   }





   function getOwner () returns (address owner) {
      return owner;
   }

   function getContainerInfoLenght () returns (uint len ) {
      return containerInfo.length;
   }

   function getContainerInfoAdrFromIndex (uint index)  returns ( address containerInfoAdr)  {
	return  address (containerInfo[index]);
   }



 function getData() constant returns (string idResult, address ownerResult, string nameResult, string originResult, string destinationResult)
   {
     idResult = registrationId;
     ownerResult =owner;
     nameResult = name;
     originResult = origin;
     destinationResult = destination;
     return;
   }


    function getEventHistoryLength () returns (uint len ) {
        return eventHistoryShip.length;
    }

    function getEvent (uint index) returns  ( uint etypeR, uint edirectionR, uint oType1R, address obj1R, uint oType2R, address obj2R, uint timeR ) {
       etypeR = eventHistoryShip.events[index].etype;
       edirectionR = eventHistoryShip.events[index].direction;
       oType1R = eventHistoryShip.events[index].objType1.objType;
       obj1R = eventHistoryShip.events[index].objType1.objAddr;
       oType2R = eventHistoryShip.events[index].objType2.objType ;
       obj2R =  eventHistoryShip.events[index].objType2.objAddr;
       timeR =  eventHistoryShip.events[index].timestamp;
        return;
     }

     

}




contract Ships is Errors, EventTracker {

     uint shipCount=0;

     mapping (address => ShipInfoList) ships;

     struct ShipInfoList {
	      bool valid;
	      address shipInfoAddr;
     }


     function Ships () {
         shipCount=0;
     }

     function getShipCount () constant returns (uint retVal) {
	      return shipCount;
     }

     function addShip ( string registrationId , string name, string origin,string destination)
                              returns (address shipInfoAddr) {
	      address shipAddr = new ShipInfo (registrationId,name, msg.sender,origin, destination);
        ships[shipAddr].valid = true;
       	ships[shipAddr].shipInfoAddr = shipAddr;
	      shipCount = shipCount + 1;
	      return shipAddr;
     }

     /*function getShipInfo (address registrationIdAddr) returns (uint error, address owner) {

	if (!ships[registrationIdAddr].valid) {
	  return  (RESOURCE_NOT_FOUND, address (this));
        } else {
	  return (NO_ERROR, ships[registrationIdAddr].shipInfoAddr);
        }
     }*/





}
