import {describe, test, expect} from '@jest/globals';

import Blockchain from '../src/lib/blockchain';

describe("Blockchain tests",() => {
    test('Should has genesis block', () =>{
    const blockcain = new Blockchain();
    
    expect(blockcain.blocks.length).toEqual(1);
    })  
})