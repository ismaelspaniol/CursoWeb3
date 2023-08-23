/**
 * Blockinfo
 */

export default interface BlockInfo {
    index: number;
    previouHash: string;
    difficulty: number;
    maxDifficulty: number;
    feePerTx: number;
    data: string;
}