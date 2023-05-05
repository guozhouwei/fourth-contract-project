pragma solidity ^0.8.19; //The ^ means that it will not compile on anything less than 0.8.0 and it will also not work with a 0.5.0 compiler.

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC20V1Factory.sol";


contract ERC20Ext is ERC20, Ownable, IStdERC20 {

    address private creator;

    string public __name;
    uint8 public __decimals;
    string public __symbol;
    uint256 public __totalSupply;

    // 支持增发，支持小数，交易收取手续费，交易部分销毁
    using SafeMath for uint256; //todo

    uint public feeRatio; //手续费千分比：feeRatio/1000
    uint public burnRatio;  //销毁千分比：burnRatio/1000
    address public feeAddress;  //手续费配置地址

    constructor () ERC20("THIS IS A EXTEND TOKEN BY ZHOUZHOU","GZW"){}

    // constructor (
    //     string memory _name,
    //     string memory _symbol) ERC20(_name, _symbol){
    //         name = _name;
    //         symbol = _symbol;
    //     }
    
    function set(uint _feeRatio, uint _burnRatio, address _feeAddress) public onlyOwner {
        feeRatio = _feeRatio;
        burnRatio = _burnRatio;
        feeAddress = _feeAddress;
    }

    function mint(address _account, uint256 _amount) public onlyOwner {
        _mint(_account, _amount);
        __totalSupply += _amount;
    }

    function burn(uint256 _amount) public {
        require(balanceOf(msg.sender) >= _amount, "burn amout exceeds balance.");
        _burn(msg.sender, _amount);
        __totalSupply -= _amount;
    } 

    function transfer(address _to, uint256 _amount) public virtual override returns (bool) {
        require(balanceOf(msg.sender) >= _amount,"transfer amount exceeds balance.");
        require(feeAddress != address(0), "feeAddress not seted."); //手续费地址没有设置
        require(feeRatio > 0, "fee not seted."); //手续费没有设置
        uint256 fee = _amount.mul(feeRatio).div(1000);  //手续费
        uint256 burnAmount = _amount.mul(burnRatio).div(1000);  //销毁总额
        uint256 amount = _amount.sub(fee).sub(burnAmount);  //实际转账金额=转账金额-手续费-销毁总额
        _transfer(msg.sender, _to, amount);
        _transfer(msg.sender, feeAddress, fee);
        if(burnAmount > 0) {
            _burn(msg.sender, burnAmount);
        }
        return true;
    }

    // 类似构造方法 constructor
    function init(
        address _creator,
        uint256 _totalSupply,
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) external {
        creator = _creator;
        __totalSupply = _totalSupply;
        //todo 因为本合约继承于ERC20，所以有些参数是不能修改的，改造方法不继承ERC20，实现方式相似 略
        // name
        __name = _name;
        // symbol
        __symbol = _symbol;
        // decimals
        __decimals = _decimals;
        
    }

}