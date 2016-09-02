import "errors.sol";
import "event_tracker.sol";


contract ShipInfo {

        string registrationId;
        address[] containerInfo;
        address owner;

   function ShipInfo (  string registrationIdP, address ownerP) {

	registrationId = registrationIdP;
	owner = ownerP;
   }

   function getId () returns (string registrationId) {
	return registrationId;
   }

   function addContainerInfo (address goods ) { 
       containerInfo.push (goods);
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
} 




contract Ships is Errors, EventTracker {

     uint shipCount=0;

     mapping (address => ShipInfoList) ships; 

     struct ShipInfoList {
	 bool valid; 
	 address shipsInfoAddr; 
     } 

     function Ships () {
         shipCount=0;
     }

     function getShipCount () constant returns (uint retVal) {
	return shipCount;
     }

     function addShip ( string registrationId , uint containerType)
                              returns (address containerInfoAddr) {

	address shipAddr = new ShipInfo (registrationId, msg.sender);
        containers[shipAddr].valregistrationId = true;	
       	containers[shipAddr].shipInfoAddr = shipAddr; 
	shipCount = shipCount + 1;
	return shipAddr;        
     }

     function getShipInfo (address registrationIdAddr) returns (uint error, address owner) {

	if (!ships[registrationIdAddr].valid) {
	  return  (RESOURCE_NOT_FOUND, address (this));
        } else {
	  return (NO_ERROR, ships[registrationIdAddr].shipInfoAddr);
        }
     }





}
