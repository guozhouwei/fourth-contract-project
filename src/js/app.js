//import './bignumber'

var web3;
var chainId;
var accountAddress;
//
//合约地址，偷懒写成常量
var CloneFactory = "0x5AB310Aeb9a92017DB43c7282eDD6E1A2A29a1df";
var std_ERC20Ext = "0x9577C698e70b79A2B0761B610f88d34E7835cA8F";
var ERC20V1Factory_contractAddress = "0xEA35FFe6cfC2c83298712E5D56a3ECD1F2AFdd9f";

var _ERC20V1FactoryAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newFee",
				"type": "uint256"
			}
		],
		"name": "changeCreateFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "cloneFactory",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "erc20Template",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "createFee",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newFee",
				"type": "uint256"
			}
		],
		"name": "ChangeCreateFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newStdTemplate",
				"type": "address"
			}
		],
		"name": "ChangeStdTemplate",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "claimOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "totalSupply",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "decimals",
				"type": "uint8"
			}
		],
		"name": "createStdERC20",
		"outputs": [
			{
				"internalType": "address",
				"name": "newERC20",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "initOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc20",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "erc20Type",
				"type": "uint256"
			}
		],
		"name": "NewERC20",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferPrepared",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newStdTemplate",
				"type": "address"
			}
		],
		"name": "updateStdTemplate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "_CLONE_FACTORY_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_CREATE_FEE_",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_ERC20_TEMPLATE_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_NEW_OWNER_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_OWNER_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_USER_STD_REGISTRY_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getTokenByUser",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "stds",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

async function connect() {
    if (window.ethereum) {
        try{
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access.");
        }
        web3 = new Web3(window.ethereum);
    } else if (window.web2) {
        web3 = new Web3(window.ethereum);
    } else {
        alert("Please install wallet!");
    }
    //
    chainId = await web3.eth.getChainId();
    var blockNumber = await web3.eth.getBlockNumber();
    var block = await web3.eth.getBlock(blockNumber);
    var blockTimestamp = block.timestamp;

    var account = await web3.eth.getAccounts();
    accountAddress = account[0];

    var balance = await web3.eth.getBalance(accountAddress);

    //
    document.getElementById("chain_id").innerText = chainId;
    document.getElementById("block_number").innerText = blockNumber;
    document.getElementById("block_timestamp").innerText = blockTimestamp;
    document.getElementById("account_address").innerText = accountAddress;
    document.getElementById("account_balance").innerText = web3.utils.fromWei(balance);

}

async function buildTokenCoin() {
	
	//验证参数 略
	var std_ERC20Ext = document.getElementById("std_erc20_id").value;
	var tokencoin_totalSupply = document.getElementById("tokencoin_totalSupply_id").value;
	var tokencoin_name = document.getElementById("tokencoin_name_id").value;
	var tokencoin_symbol = document.getElementById("tokencoin_symbol_id").value;
	var tokencoin_decimals = document.getElementById("tokencoin_decimals_id").value;

	//
	try { 
		var instance = new web3.eth.Contract(_ERC20V1FactoryAbi, ERC20V1Factory_contractAddress, {
																								from: accountAddress, 																	
																								gasPrice: '20000000000'
																							});
	} catch (e) {
		alert("请先连接钱包！！！");
	}

	try { 
		var bignumberDecimals = new BigNumber(tokencoin_decimals);		
		var hx = await instance.methods.createStdERC20(tokencoin_totalSupply, 
												tokencoin_name, 
												tokencoin_symbol, 
												bignumberDecimals).send();
	//	console.info(hx);										
	  }
	  catch (e) {
		console.error("createStdERC20 error!" + e);
	  }

}


async function showCloneERC20() {
	//
	try { 
		var instance = await new web3.eth.Contract(_ERC20V1FactoryAbi, ERC20V1Factory_contractAddress, {
																								from: accountAddress, 																	
																								gasPrice: '20000000000'
																							});
	} catch (e) {
		alert("请先连接钱包！！！");
	}
		//
	try { 
		var cloneERC2OList = await instance.methods.getTokenByUser(accountAddress).call({from: accountAddress}, function(error, result){
		 																																console.info(error);	
		 																																console.info(result);	
		 																															});
		console.info("cloneERC2OList");	
		console.info(cloneERC2OList);
		var cloneERC2OListStr = "";	
		for (var i=0; i<cloneERC2OList.length; i++) { 
			cloneERC2OListStr += "（" + (i+1) + "）" + cloneERC2OList[i] + ", ";
		}
		document.getElementById("std_ERC20Ext_list_id").innerText = cloneERC2OListStr;									
	  } catch (e) {
		console.info("getTokenByUser error!");

	  }

}