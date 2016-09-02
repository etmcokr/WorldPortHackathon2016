import "errors.sol";
import "event_tracker.sol";


contract GoodsInfo {

   uint goodsType;
   string name;
   address owner;
   string description; 
    

 // Constructor
   function GoodsInfo (uint goodsTypeP, string nameP, string descriptionP,address ownerP){
     goodsType = goodsTypeP;
     name = nameP;
     owner = ownerP;
     description = descriptionP;
   }


   function remove() {
     if (msg.sender == owner){
       selfdestruct(owner);
     }
   }

   function getNname () returns (string name) {
	return name;
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

     function addGoods ( string name, uint goodsType, string description)
                              returns (address goodsAdr) {

	GoodsInfo gi = new GoodsInfo (goodsType,name, description, msg.sender);
        address uid =  address (gi);
        goods[uid].addrInfo  =  uid; 
         goods[uid].valid = true;	
        return uid;
     }

   //  function getGoodsInfo (address ui) returns (uint error,  string name, uint goodsType, string description, address owner) {

//	if (!goods[ui].valid) {
//	  return  (RESOURCE_NOT_FOUND, "",0,"", address (this));
  //      } else {
    //       GoodsInfo gi =  GoodsInfo (goods [ui].addrInfo);	
//	  return (NO_ERROR, gi.name, gi.goodsType, gi.description,gi.owner);
  //      }
    // }





}
