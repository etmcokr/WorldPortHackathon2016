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

    goods.addGoods(name, goodtype, description, function(error, data) {
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
    res.json(goodInfo);

});


module.exports = router;
