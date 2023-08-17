
/**
 * Block class
 */
export default class Block{
    index: number;
    hash: string;

    /**
     * Create a new block
     * @param index The block index in blockchanin
     * @param hash The block hash
     */
    constructor(index: number, hash: string){
        this.hash = hash;
        this.index = index;
    }
    /**
     *  Validates the block
     * @returns Return is validate block
     */
    isValid():boolean{
        if(this.index < 0) return false;
        if(!this.hash) return false;
        return true;

    }
}