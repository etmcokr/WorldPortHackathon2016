var blockchain = require('./eriscontract.js');
var goods = blockchain.getGoods();

console.log("found goods:"+goods);
var address = "8A960DA308A7EC21F3A003D67766677D876E39AE";
var GoodInfo = blockchain.getGoodInfo(address);
console.log("found GoodInfo:"+GoodInfo);

var containers = blockchain.getContainers();
console.log("found containers:"+containers);


var addressContainer = "D38536903E366DD4B975BAEF502E84524B7D7D27";
var containerInfo = blockchain.getContainerInfo(address);
console.log("found containerInfo:"+containerInfo);
