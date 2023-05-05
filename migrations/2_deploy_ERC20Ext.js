const ERC20Ext = artifacts.require("ERC20Ext");

module.exports = function (deployer) {
  // _creator: "0xB7f365d4113FE68ABA7a9121EbFBd29Be04aBadD"
  // _name: "GZW Coin"
  // _symbol: "GZW" 
  // _decimals: 2 
  deployer.deploy(ERC20Ext);
};
