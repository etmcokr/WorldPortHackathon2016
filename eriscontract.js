var fs = require('fs');
var erisC = require('eris-contracts');

var erisdbURL = "http://localhost:1337/rpc";
var contractData = require('./contract/epm.json');


var contactGoodsInfoAddress = contractData.deployGoodInfo;
var contactGoodsAddress = contractData.deployGoods;

var abiContactGoodsInfo = JSON.parse(fs.readFileSync("./contract/abi/" + contactGoodsInfoAddress));
var abiContactGoods = JSON.parse(fs.readFileSync("./contract/abi/" + contactGoodsAddress));

var accountData = require('./contract/accounts.etmcokr.json');
var contractsManager = erisC.newContractManagerDev(erisdbURL, accountData.simplechain_full_000);




var blockchain = function () {};

blockchain.prototype.getGoods = function()
{
  console.log("GetGoods Called");
  var goods = contractsManager.newContractFactory(abiContactGoods).at(contactGoodsAddress);
  console.log("Goods: " + JSON.stringify(goods));
  return goods;
};

blockchain.prototype.getGoodInfo = function(address)
{
  console.log("getGoodInfo Called");
  var goods = contractsManager.newContractFactory(abiContactGoodsInfo).at(address);
  console.log("GoodInfo: " + JSON.stringify(goods));
  return goods;
};

module.exports = new blockchain();
