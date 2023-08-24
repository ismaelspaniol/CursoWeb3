import axios from 'axios';
import BlockInfo from '../lib/blockInfo';
import Block from '../lib/block';
const BLOCKCHAIN_SERVER = 'http://localhost:3000/';

const minerWallet = {
    privateKey : "123456",
    publicKey : "ismaelspaniol"
}

let totalMinded = 0;

async function mine(){
    console.log("Getting next block info");

    const {data}= await axios.get(`${BLOCKCHAIN_SERVER}blocks/next`);
    const blockInfo = data as BlockInfo;
    
    const newBlock = Block.fromBlockInfo(blockInfo);
    
    //TODO : add tx from reward

    console.log("Start mining block #"+blockInfo.index)
    newBlock.mine(blockInfo.difficulty, minerWallet.publicKey);

    console.log("Block mined! Sending to blockChain...");
    try {
        await axios.post(`${BLOCKCHAIN_SERVER}blocks/`, newBlock);
        console.log("Block sent and accepted!")
        totalMinded++;
        console.log("Total mined blocks: "+totalMinded);
    } catch (err:any) {
        console.error(err.response ? err.response.data : err.message);
        
    }

    setTimeout(()=>{
        mine();

    },1000);

    
}

mine();