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

var ships = blockchain.getShips();
console.log("found ships:"+ships);

var addressShip = "F2CFA25A6F93D870F634127AA662D2C451B5EF71";
var shipInfo = blockchain.getShipInfo(address);
console.log("found shipInfo:"+shipInfo);
