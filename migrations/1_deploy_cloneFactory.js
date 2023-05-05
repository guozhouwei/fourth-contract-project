const CloneFactory = artifacts.require("CloneFactory");

module.exports = function (deployer) {
  deployer.deploy(CloneFactory);
};


/**
 * 执行后结果：
 * 
 * contract address:    0x2dcF822293C48a20Ea91F4fC5fc5F6f5E826a0C9
 */