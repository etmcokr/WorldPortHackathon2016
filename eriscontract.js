var fs = require('fs');
var erisC = require('eris-contracts');

var erisdbURL = "http://localhost:1337/rpc";
var contractData = require('./contract/epm.json');


var contactGoodsInfoAddress = contractData.deployGoodInfo;
var contactGoodsAddress = contractData.deployGoods;
var contactContainersAddress = contractData.deployContainers;
var contactContainerInfoAddress = contractData.deployContainerInfo;

var contactShipsAddress = contractData.deployShips;
var contactShipInfoAddress = contractData.deployShipInfo;


var abiContactGoodsInfo = JSON.parse(fs.readFileSync("./contract/abi/" + contactGoodsInfoAddress));
var abiContactGoods = JSON.parse(fs.readFileSync("./contract/abi/" + contactGoodsAddress));
var abiContactContainers = JSON.parse(fs.readFileSync("./contract/abi/" + contactContainersAddress));
var abiContactContainerInfo = JSON.parse(fs.readFileSync("./contract/abi/" + contactContainerInfoAddress));
var abiContactShips = JSON.parse(fs.readFileSync("./contract/abi/" + contactShipsAddress));
var abiContactShipInfo = JSON.parse(fs.readFileSync("./contract/abi/" + contactShipInfoAddress));


var accountData = require('./contract/accounts.etmcokr.json');
var contractsManager = erisC.newContractManagerDev(erisdbURL, accountData.simplechain_full_000);




var blockchain = function() {};

blockchain.prototype.getGoods = function() {
    console.log("GetGoods Called");
    var goods = contractsManager.newContractFactory(abiContactGoods).at(contactGoodsAddress);
    console.log("Goods: " + JSON.stringify(goods));
    return goods;
};

blockchain.prototype.getContainers = function() {
    console.log("getContainers Called");
    var containers = contractsManager.newContractFactory(abiContactContainers).at(contactContainersAddress);
    console.log("Containers: " + JSON.stringify(containers));
    return containers;
};

blockchain.prototype.getShips = function() {
    console.log("getShips Called");
    var ships = contractsManager.newContractFactory(abiContactShips).at(contactShipsAddress);
    console.log("ships: " + JSON.stringify(ships));
    return ships;
};


blockchain.prototype.getGoodInfo = function(address) {
    console.log("getGoodInfo Called");
    var goodInfo = contractsManager.newContractFactory(abiContactGoodsInfo).at(address);
    console.log("GoodInfo: " + JSON.stringify(goodInfo));
    return goodInfo;
};


blockchain.prototype.getContainerInfo = function(address) {
    console.log("getContainerInfo Called");
    var containerInfo = contractsManager.newContractFactory(abiContactContainerInfo).at(address);
    console.log("ContainerInfo: " + JSON.stringify(containerInfo));
    return containerInfo;
};

blockchain.prototype.getShipInfo = function(address) {
    console.log("getShipInfo Called");
    var shipInfo = contractsManager.newContractFactory(abiContactShipInfo).at(address);
    console.log("ShipInfo: " + JSON.stringify(shipInfo));
    return shipInfo;
};

module.exports = new blockchain();
