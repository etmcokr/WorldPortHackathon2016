import "errors.sol";

contract EventTracker is Errors {

    uint constant OBJ_GOODS = 100;
    uint constant OBJ_CONTAINER = 101;
     uint constant OBJ_SHIP = 103;
   
    uint constant ACTION_LOAD = 500;
    uint constant ACTION_UNLOAD = 501;

    uint constant TO = 1;
    uint constant FROM = 2; 

    struct ObjType {
	address objAddr;
	uint    objType;
    } 

    struct event_t{
        uint etype;
	uint direction;
	ObjType objType1;
	ObjType objType2;
        uint timestamp;
    }

   struct history {
        uint length;
        mapping(uint => event_t) events;
    }

   function addEvent(history storage hist, uint etype, uint edirection, uint oType1, address obj1, uint oType2, address obj2  ) internal {
        hist.length = hist.length + 1;
        event_t thisEvt = hist.events[hist.length];
        thisEvt.etype = etype;
	 thisEvt.direction = edirection;
	thisEvt.objType1.objType = oType1;
        thisEvt.objType1.objAddr = obj1;
      	thisEvt.objType2.objType = oType2;
	 thisEvt.objType2.objType = oType2; 
        thisEvt.timestamp = block.timestamp;
        return;
    }

}
