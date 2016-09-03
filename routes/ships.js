var express = require('express');
var router = express.Router();
var blockchain = require('../eriscontract.js');

var async = require('async');
/* GET users listing. */
router.post('/', function(req, res, next) {
    //res.send('respond with a resource');
    console.log("Body: " + JSON.stringify(req.body));
    var ships = blockchain.getShips();
    var body = req.body;
    var registrationId = body.registrationId;
    var name = body.name;
    var origin = body.origin;
    var destination = body.destination;

    ships.addShip(registrationId, name,origin,destination,function(error, data) {
        if (error) {
            res.json({
                err: error
            });
        } else {
            res.json({
                address: data
            });
        }
    });

});


router.get('/:address', function(req, res, next) {
     var address = req.params.address;
     console.log("get Address : " + address);
     var shipInfo = blockchain.getShipInfo(address);
     console.log("Found shipInfo: " + shipInfo);
     shipInfo.getData(function(error, data) {
         if (error) {
             console.log("chips Error: " + error);
             res.json(error);
         } else {
             console.log("get Data: " + JSON.stringify(data));
             var result = {
                 registrationId: data[0],
                 owner:  data[1],
                 name:  data[2],
                 origin: data[3],
                 destination: data[4]
             };
             res.json(result);
         }
     });
});


router.post('/:address/containers', function(req, res, next) {
    var address = req.params.address;
    console.log("get Address : " + address);
    var shipInfo = blockchain.getShipInfo(address);
    var containdersToAdd = req.body;
    console.log("goodsToAdd: " + containdersToAdd);
    async.each(containdersToAdd, function(address, callback) {
        console.log("add: " + address);
        shipInfo.addContainerInfo(address, callback);
    }, function(error, result) {
        console.log("Error: " + error);
        console.log("result: " + result);
        if (error) {
            res.json(error);
        } else {
            res.json({
                result: "success"
            });
        }
    });
});

router.get('/:address/containers', function(req, res, next) {
    var address = req.params.address;
    console.log("get Address : " + address);
    var shipInfo = blockchain.getShipInfo(address);

    shipInfo.getContainerInfoLenght(function(error, data) {
        // hack to make a Array..
        if (error) {
            res.json(error);
            return;
        }
        console.log("data size: " + data);
        var itemToCollect = [];
        for (var i = 0; i < data; i++) {
            itemToCollect.push(i);
        }
        console.log("itemToCollect: " + JSON.stringify(itemToCollect));
        async.map(itemToCollect, function(item, callback) {
            console.log("item: " + item);
            shipInfo.getContainerInfoAdrFromIndex(item, function(error, data) {
                console.log("error1:" + error);
                console.log("data:" + data);
                callback(error, data);
            });
        }, function(error, resultValue) {
            console.log("Error: " + error);
            console.log("result: " + resultValue);
            if (error) {
                res.json(error);
            } else {
                res.json(resultValue);
            }
        });
    });
});


router.get('/:address/events', function(req, res, next) {
    var address = req.params.address;
    console.log("get Address : " + address);
    var shipInfo = blockchain.getShipInfo(address);

    shipInfo.getEventHistoryLength(function(error, data) {
        // hack to make a Array..
        if (error) {
            res.json(error);
            return;
        }
        console.log("data size: " + data);
        var itemToCollect = [];
        for (var i = 1; i <= data; i++) {
            itemToCollect.push(i);
        }
        console.log("itemToCollect: " + JSON.stringify(itemToCollect));
        async.map(itemToCollect, function(item, callback) {
            console.log("item: " + item);
            shipInfo.getEvent(item, function(error, data) {
                console.log("error1:" + error);
                console.log("data:" + JSON.stringify(data));


                var action = "ACTION_UNKOWN";
                if (data[0] == "500") {
                    action = "ACTION_LOAD";
                }
                if (data[0] == "501") {
                    action = "ACTION_UNLOAD";
                }

                var direction = "UNKOWN";
                if (data[1] == "1") {
                    direction = "TO";
                }
                if (data[1] == "2") {
                    direction = "FROM";
                }

                var restult = {
                    action: action,
                    object1: {
                        type: getType(data[2]),
                        address: data[3]
                    },
                    direction: direction,
                    object2: {
                        type: getType(data[4]),
                        address: data[5]
                    },
                    timestamp: data[6]
                };

                callback(error, restult);
            });
        }, function(error, resultValue) {
            console.log("Error: " + error);
            console.log("result: " + resultValue);
            if (error) {
                res.json(error);
            } else {


                res.json(resultValue);
            }
        });
    });
});


function getType(type) {
    console.log("Type: " + type);

    if (type == "100") {
        return "OBJ_GOODS";
    }
    if (type == "101") {
        return "OBJ_CONTAINER";
    }
    if (type == "103") {
        return "OBJ_SHIP";
    }

    return "OBJ_UNKOWN";
}


router.delete('/:address/containers', function(req, res, next) {
    var address = req.params.address;
    console.log("delete Address : " + address);
    var shipInfo = blockchain.getShipInfo(address);
    var containdersToRemove = req.body;
    console.log("containerToremove: " + containdersToRemove);
    async.each(containdersToRemove, function(address, callback) {
        console.log("remove: " + address);
        shipInfo.getContainerInfoIndex(address, function(error,data){
          console.log("data: "+ data);
          callback(error,data);
        });
    }, function(error, result) {
        console.log("Error: " + error);
        console.log("result: " + result);
        if (error) {
            res.json(error);
        } else {
            res.json({
                result: result
            });
        }
    });
});



module.exports = router;
