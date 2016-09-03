import "errors.sol";
import "event_tracker.sol";


contract GoodsInfo {

   uint goodsType;
   string name;
   address owner;
   string description;
   string origin;
   string destination;
   uint estimatedTimeOfArrival;
   string manufacturer;

 // Constructor
   function GoodsInfo (uint goodsTypeP, string nameP, string descriptionP,string originP, string destinationP, uint estimatedTimeOfArrivalP, string manufacturerP,address ownerP){
     goodsType = goodsTypeP;
     name = nameP;
     owner = ownerP;
     description = descriptionP;
     origin = originP;
     destination = destinationP;
     estimatedTimeOfArrival = estimatedTimeOfArrivalP;
     manufacturer = manufacturerP;
   }

   function getData() constant returns (uint goodsTypeResult, string nameResult, address ownerResult, string descriptionResult,string originResult,string destinationResult, uint estimatedTimeOfArrivalResult, string manufacturerResult)
   {
     goodsTypeResult = goodsType;
     nameResult = name;
     ownerResult =owner;
     descriptionResult = description;
     originResult = origin;
     destinationResult = destination;
     estimatedTimeOfArrivalResult = estimatedTimeOfArrival;
     manufacturerResult = manufacturer;
     return;
   }

   function remove() {
     if (msg.sender == owner){
       selfdestruct(owner);
     }
   }

   function getName () returns (string name) {
	return name;
   }

   function getGoodsType () returns (uint goodsType ) {
	    return goodsType;
   }

   function getDescription () returns (string description) {

      return description;
   }

   function getOwner () returns (address owner) {

     return owner;
   }
}




contract Goods is Errors, EventTracker {

     uint goodsCount=0;

     mapping (address => GoodsHolder) goods;

     struct GoodsHolder {
	 bool valid;
	 address addrInfo;
     }

     function Goods () {
         goodsCount=0;
     }

     function getGoodsCount () constant returns (uint retVal) {
	return goodsCount;
     }

     function addGoods ( string name, uint goodsType, string description, string origin,string destination,uint estimatedTimeOfArrival, string manufacturer )
                              returns (address goodsAdr) {

	GoodsInfo gi = new GoodsInfo (goodsType,name, description, origin, destination, estimatedTimeOfArrival, manufacturer,msg.sender);
        address uid =  address (gi);
        goods[uid].addrInfo  =  uid;
         goods[uid].valid = true;
        return uid;
     }

     function getGoodsInfo (address ui) returns (uint error, address owner) {

	if (!goods[ui].valid) {
	  return  (RESOURCE_NOT_FOUND, address (this));
        } else {
	  return (NO_ERROR, goods[ui].addrInfo);
        }
     }





}
