var express = require('express');
var router = express.Router();
var blockchain = require('../eriscontract.js');
var async = require('async');
/* GET users listing. */
router.post('/', function(req, res, next) {
    //res.send('respond with a resource');
    console.log("Body: " + JSON.stringify(req.body));
    var containers = blockchain.getContainers();
    var body = req.body;
    var id = body.id;
    var containertype = body.containertype;

    containers.addContainer(id, containertype, function(error, data) {
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
    var containerInfo = blockchain.getContainerInfo(address);
    console.log("Found containerInfo: " + containerInfo);
    containerInfo.getData(function(error, data) {
        if (error) {
            console.log("chips Error: " + error);
            res.json(error);
        } else {
            console.log("get Data: " + JSON.stringify(data));
            var result = {
                id: data[1],
                containertype: data[0],
                owner: data[2]
            };
            res.json(result);
        }
    });
});

router.post('/:address/goods', function(req, res, next) {
    var address = req.params.address;
    console.log("get Address : " + address);
    var containerInfo = blockchain.getContainerInfo(address);
    var goodsToAdd = req.body;
    console.log("goodsToAdd: " + goodsToAdd);
    async.each(goodsToAdd, function(address, callback) {
        console.log("add: " + address);
        containerInfo.addGoodsInfo(address, callback);
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


router.get('/:address/goods', function(req, res, next) {
    var address = req.params.address;
    console.log("get Address : " + address);
    var containerInfo = blockchain.getContainerInfo(address);

    containerInfo.getGoodsInfoLenght(function(error, data) {
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
            containerInfo.getGoodsInfoAdrFromIndex(item, function(error, data) {
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

router.get('/:address/goodsdetails', function(req, res, next) {
    var address = req.params.address;
    console.log("get Address : " + address);
    var containerInfo = blockchain.getContainerInfo(address);
    console.log("do getGoodsInfoLenght");
    containerInfo.getGoodsInfoLenght(function(error, data) {
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
            // collect the item.
            containerInfo.getGoodsInfoAdrFromIndex(item, function(error, goodsInfoAdr) {
                console.log("error1:" + error);
                console.log("goodsInfoAdr:" + goodsInfoAdr);
                var goodInfo = blockchain.getGoodInfo(goodsInfoAdr);
                goodInfo.getData(function(error, goodInfoData) {
                    console.log("Error3:" + error);
                    console.log("goodInfoData:" + goodInfoData);
                    var result = {
                        name: goodInfoData[1],
                        goodtype: goodInfoData[0],
                        owner: goodInfoData[2],
                        description: goodInfoData[3],
                        origin: goodInfoData[4],
                        destination: goodInfoData[5],
                        estimatedTimeOfArrival: goodInfoData[6],
                        manufacturer: goodInfoData[7]
                    };

                    callback(error, result);
                });
                //                callback(error, goodsInfoAdr);
            });
        }, function(error, finalResult) {
            if (error) {
                res.json(error);
            } else {
                res.json(finalResult);
            }
        });
    });

});


router.get('/:address/events', function(req, res, next) {
    var address = req.params.address;
    console.log("get Address : " + address);
    var containerInfo = blockchain.getContainerInfo(address);

    containerInfo.getEventHistoryLength(function(error, data) {
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
            containerInfo.getEvent(item, function(error, data) {
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

module.exports = router;
