var express = require('express');
var router = express.Router();
var blockchain = require('../eriscontract.js');
/* GET users listing. */
router.post('/', function(req, res, next) {
    //res.send('respond with a resource');
    console.log("Body: " + JSON.stringify(req.body));
    var goods = blockchain.getGoods();
    var body = req.body;
    var name = body.name;
    var goodtype = body.goodtype;
    var description = body.description;
    var origin = body.origin;
    var destination = body.destination;
    var estimatedTimeOfArrival = body.estimatedTimeOfArrival;
    var manufacturer = body.manufacturer;

    goods.addGoods(name, goodtype, description, origin, destination, estimatedTimeOfArrival, manufacturer, function(error, data) {
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
    var goodInfo = blockchain.getGoodInfo(address);
    console.log("Found goodInfo: " + goodInfo);
    goodInfo.getData(function(error, data) {
        if (error) {
            console.log("chips Error: " + error);
            res.json(error);
        } else {
            console.log("get Data: " + JSON.stringify(data));
            var result = {
                name: data[1],
                goodtype: data[0],
                owner: data[2],
                description: data[3],
                origin: data[4],
                destination: data[5],
                estimatedTimeOfArrival: data[6],
                manufacturer: data[7]
            };
            res.json(result);
        }
    });
});


module.exports = router;
