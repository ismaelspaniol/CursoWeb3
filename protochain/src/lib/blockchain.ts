import Block from "./block";
import Validation from "./validation";

/**
 * Blockcian class
 */
export default class Blockchain{
    blocks:Block[];
    nextIndex : number = 0;
    /**
     * Create a new blockchain
     */
    constructor(){
        this.blocks = [new Block(0,"","genesis Block")];
        this.nextIndex++;
    }

    getLastBlock():Block{
        return this.blocks[this.blocks.length - 1];
    }

    addBlock(block : Block): Validation{
        const lastBlock = this.getLastBlock();
        const validation = block.isValid(lastBlock.hash, lastBlock.index);
        if(!validation.success) 
            return new Validation(false, `Invalid block. ${validation.success}`);
        
        this.blocks.push(block);
        this.nextIndex++;

        return new Validation();
    }

    getBlock(hash : String): Block | undefined{
        return this.blocks.find(b => b.hash === hash);
    }

    isValid(): Validation{
        for(let i= this.blocks.length - 1; i> 0; i--){
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            const validation = currentBlock.isValid(previousBlock.hash, previousBlock.index);
            if(!validation.success) 
                return new Validation(false, `Invalid block #${currentBlock.index}:  ${validation.message}`);
        }
        return new Validation;
    }
}