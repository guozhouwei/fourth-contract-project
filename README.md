# 代币合约开发

## 代码位置

### 合约位置
```html
contracts/ERC20Ext.sol
```

### js
```html
src/js/app.js
```
### html
```html
src/index.html
```

## 演示

### >>> step 1 页面展示

![](https://github.com/guozhouwei/tmp/blob/main/images/001.png)

### >>> step 2 代币初始值
先部署代币合约到sepolia测试网络，获取合约地址，导入小狐狸钱包。
![](https://github.com/guozhouwei/tmp/blob/main/images/01.png)
如上图：代币有0.09999ADT
### >>> step 3 mint
铸造 3*1000000000000000000个代币，如下图：
![](https://github.com/guozhouwei/tmp/blob/main/images/002.png)
如上图：代币变为3.09999ADT

### >>> step 4 burn
燃烧 2*1000000000000000000个代币，如下图：
![](https://github.com/guozhouwei/tmp/blob/main/images/003.png)
如上图：代币变为1.09999ADT

---------------------

## 环境准备
### truffle


truffle migrate --network sepolia --to 2



