var express = require('express');
var router = express.Router();
var blockchain = require('../eriscontract.js');
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


module.exports = router;
