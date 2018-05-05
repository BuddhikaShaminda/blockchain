const SHA256= require('crypto-js/sha256'); 
// we need calcualte hash so weneed this library. we have to download it to the same folde by using 'npm install --save crypto-js'
class block{

	constructor(index,timestamp,data,previoushash=''){
		this.index=index;
		this.timestamp=timestamp;
		this.data=data;
		this.hash=this.calculateHash();
		this.previoushash=previoushash;
		this.nonce=0;
	}

	calculateHash(){
		return SHA256(this.index + this.previoushash +this.nonce + this.timestamp +JSON.stringify(this.data)).toString();
	// return the hash
	}
	mineBlock(dificulty){
		while(this.hash.substring(0,dificulty) !== Array(dificulty+1).join("0")){
			this.nonce++;
			this.hash=this.calculateHash()
		}
		console.log("Block mined : "+this.hash);
	}
}

class blockChain{

	constructor(){
		this.chain=[this.startingBlock()];
		this.dificulty=4;
	}

	startingBlock(){
		return new block(0,"27/04/2018",'starting block','0');
	}

	// getLatestBlock(){
	// 	return this.chain[this.chain.length-1];
	// }
	addblock(newBlock){
		newBlock.previoushash = this.chain[this.chain.length-1].hash;
		newBlock.mineBlock(this.dificulty);
		this.chain.push(newBlock);
	}
	isValid(){
		for (let i = 1; i <= this.chain.length-1; i++) {
			const currentBlock=this.chain[i];
			const previousBlock=this.chain[i-1];
			if(currentBlock.hash!=currentBlock.calculateHash()){
				return false; 
			}
			if (currentBlock.previoushash!=previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}

let mychain =new blockChain();

//console.log('Block is mining....');
mychain.addblock(new block(1,'11/18/2018',"hello"));
// console.log('Block is mining....');
mychain.addblock(new block(2,'12/18/2018',"friend"));
// console.log('Block is mining....');
mychain.addblock(new block(3,'13/18/2018',"this is"));
// console.log('Block is mining....');
mychain.addblock(new block(4,'14/18/2018',"first mychain"));


//console.log(mychain.isValid());
//mychain.chain[1].data="hbuwahhhhh";//change the data of block 1

//console.log(mychain.isValid()); //check whether is the chain is valid or not
//console.log(JSON.stringify(mychain,null,4));//make the chaing format to readerble format. 
console.log(mychain);