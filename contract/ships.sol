import "errors.sol";
import "event_tracker.sol";


contract ShipInfo is Errors, EventTracker  {

        string registrationId;
        string name;
        address[] containerInfo;
        address owner;
	      history eventHistoryShip;
        string origin;
        string destination;


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
