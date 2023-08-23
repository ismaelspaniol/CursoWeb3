
import Validation from '../validation';
/**
 * Mocked Block class
 */
export default class Block{
    index: number;
    timestamp : number;
    nonce: number;
    miner: string;
    hash: string;
    previousHash: string;
    data: string;
    

    
    /**
     * Create a new mock block
     * @param block The mock block data
  
     */
    constructor(block? : Block){
        
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";
        this.data =  block?.data || "";
        this.nonce = block?.nonce || 0;
        this.miner = block?.miner || "";
        this.hash = block?.hash || this.getHash();
        
    }

    getHash():string{
        return this.hash || "abc";
    }
    /**
     *  Validates the mock block
     * @returns Return if this mock block is valid
     */
    isValid(previousHash : string, previousIndex : number):Validation{
        if(!previousHash || previousIndex < 0 || this.index < 0)
            return new Validation(false, "Invalid mock")
        return new Validation;

    }
}