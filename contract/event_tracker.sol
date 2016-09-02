import "errors.sol";

contract EventTracker is Errors {

    uint constant EVENT_VESSEL_ASSIGN_BERT = 1;
    uint constant EVENT_VESSEL_PILOT_BOOKED = 2;
    uint constant EVENT_VESSEL_DEASSIGN_BERT = 3;


    uint constant VESSEL = 5000;
    uint constant BERT = 5001;

    struct event_t{
        uint etype;
        address agent;
        uint timestamp;
    }

   struct history {
        uint length;
        mapping(uint => event_t) events;
    }

   function addEvent(history storage hist, uint etype, address agent  ) internal {
        hist.length = hist.length + 1;
        event_t thisEvt = hist.events[hist.length];
        thisEvt.etype = etype;
	 thisEvt.agent = agent;
        thisEvt.timestamp = block.timestamp;
        return;
    }

}
