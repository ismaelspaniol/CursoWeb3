import exppress from 'express';
import morgan from 'morgan';
import Blockchain from '../lib/blockchain';


const PORT: number = 3000;

const app = exppress();

app.use(morgan('tiny'));
app.use(exppress.json());

const blockchain = new Blockchain();

app.get('/status', (req, res, next) => {
    res.json({
        numberOfBlocks:blockchain.blocks.length,
        isValid:blockchain.isValid(),
        lastBlocl:blockchain.getLastBlock()

    })
})

app.get('/blocks/:indexOrHash', (req, res,next) =>{
    let block;
    if(/^[0-9]+$/.test(req.params.indexOrHash))
         block = blockchain.blocks[parseInt(req.params.indexOrHash)]
    else 
        block = blockchain.getBlock(req.params.indexOrHash)
    if(!block)
        return res.sendStatus(404);
    else
        return res.json(block);
})

app.listen(PORT, ()=>{
    console.log(`Blockchain server is running at ${PORT}`)
})