import "errors.sol";
import "event_tracker.sol";


contract ContainerInfo is Errors, EventTracker   {

        string id;
	      uint containerType;
        address[] goodsInfo;
        address owner;
	      history eventHistoryContainer;


   function ContainerInfo (  string idP,  uint containerTypeP, address ownerP) {
	     id = idP;
	     containerType = containerTypeP;
	     owner = ownerP;
   }

   function getData() constant returns (string idResult, uint containerTypeResult, address ownerResult )
   {
     idResult = id;
     containerTypeResult = containerType;
     ownerResult =owner;
     return;
   }


   function getId () returns (string id) {
	    return id;
   }

   function addGoodsInfo (address goods ) {

        addEvent (eventHistoryContainer, ACTION_LOAD, TO, OBJ_GOODS, goods, OBJ_CONTAINER, address (this));
       goodsInfo.push(goods);
   }


   function getContainerType () returns (uint containerType ) {
       return containerType;

   }

   function getOwner () returns (address owner) {
      return owner;
   }

   function getGoodsInfoLenght () returns (uint len ) {
       return goodsInfo.length;
   }

   function getGoodsInfoAdrFromIndex (uint index)  returns ( address goodsInfoAdr)  {
	    return  address (goodsInfo[index]);
   }

    function getEventHistoryLength () returns (uint len ) {
        return eventHistoryContainer.length;
    }

    function getEvent (uint index) returns  ( uint etype, uint edirection, uint oType1, address obj1, uint oType2, address obj2  ) {
	return (eventHistoryContainer.events[index].etype, 
                eventHistoryContainer.events[index].direction, 
                eventHistoryContainer.events[index].objType1.objType,
                 eventHistoryContainer.events[index].objType1.objAddr, 
                 eventHistoryContainer.events[index].objType2.objType , 
                 eventHistoryContainer.events[index].objType2.objAddr);
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
