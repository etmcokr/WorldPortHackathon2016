import "errors.sol";
import "event_tracker.sol";


contract ContainerInfo is Errors, EventTracker {

        string id;
	uint containerType;
        address[] goodsInfo;
        address owner;
	history events;

   function ContainerInfo (  string idP,  uint containerTypeP, address ownerP) {

	id = idP;
	containerType = containerTypeP;
	owner = ownerP;
   }

   function getId () returns (string id) {
	return id;
   }

   function addGoodsInfo (address goods ) {
       addEvent (events, ACTION_LOAD, TO, OBJ_GOODS, goods, OBJ_CONTAINER, address (this)); 
       goodsInfo.push (goods);
   }

   function getContainerType () returns (uint containerType ) {
       return containerType;

   }

   function getOwner () returns (address owner) {
      return owner;
   }

   function getGoodsInfoLenght () returns (uint len ) {
       goodsInfo.length;
   }

   function getGoodsInfoAdrFromIndex (uint index)  returns ( address goodsInfoAdr)  {
	return  address (goodsInfo[index]);
   }
} 




contract Containers is Errors, EventTracker {

     uint containerCount=0;

     mapping (address => ContainerInfoList) containers; 

     struct ContainerInfoList {
	 bool valid; 
	 address containerInfoAddr; 
     } 

     function Containers () {
         containerCount=0;
     }

     function getContainerCount () constant returns (uint retVal) {
	return containerCount;
     }

     function addContainer ( string id , uint containerType)
                              returns (address containerInfoAddr) {

	address contAddr = new ContainerInfo (id,containerType, msg.sender);
        containers[contAddr].valid = true;	
       	containers[contAddr].containerInfoAddr = contAddr; 
	containerCount = containerCount + 1;
	return contAddr;        
     }

     function getContainerInfo (address idAddr) returns (uint error, address owner) {

	if (!containers[idAddr].valid) {
	  return  (RESOURCE_NOT_FOUND, address (this));
        } else {
	  return (NO_ERROR, containers[idAddr].containerInfoAddr);
        }
     }





}
