const ERC20V1Factory = artifacts.require("ERC20V1Factory");

module.exports = function (deployer) {
  /**
   * deploy 参数
   * 
   * cloneFactory  代码克隆，通过合约创建合约, 
   * erc20Template  提供标准的ERC20代币模版
   * createFee   创建的费用
   **/
  deployer.deploy(ERC20V1Factory, "0x5AB310Aeb9a92017DB43c7282eDD6E1A2A29a1df", "0x9577C698e70b79A2B0761B610f88d34E7835cA8F", 0);
};
