const client = require('../../elasticClient');

exports.addDocument= async(req,res,next)=>{
    try{
        const pname=req.body.name;
        const pprice=req.body.price;
        const pid=req.body.id;
        const pindex=req.body.indexName;
        const doc={
            name:pname,
            price:pprice
        }
        const result=await client.index({
            index:pindex,
            id:pid,
            document:doc
        });
        res.status(200).json({msg:"success , result ",result});
    }
    catch(err){
        res.status(500).json({msg:"failed ",err})
    }
}
// exports.getDocument=as