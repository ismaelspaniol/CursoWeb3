import Block from "./block";

/**
 * Blockcian class
 */
export default class Blockchain{
    blocks:Block[];
    /**
     * Create a new blockchain
     */
    constructor(){
        this.blocks = [new Block(0,"genesis")];
    }
}