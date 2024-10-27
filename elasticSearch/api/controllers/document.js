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

exports.addBulkDocument = async (req, res, next) => {
    try {
        const operations = req.body;
        const body = [];
        for (let i = 0; i < operations.length; i++) {
            const operation = operations[i];
            console.log(operation)
            if (operation.index) {
                body.push({ index: {_index:"product", _id: operation.index._id } });
            } else {
                body.push(operation);
            }
        }

        const result = await client.bulk({ body });

        res.status(200).json({ msg: "success", result });
    } catch (err) {
        res.status(500).json({ msg: "failed", err });
    }
};
exports.allDocument=async(req,res,next)=>{
    try {
        // query_dsl={
        //     "size":20,
        //     "query":{
        //         "match_all":{}
        //     }
        // }
        // const result = await client.search({
        //     index: "product",
        //     body:query_dsl
        // });
        const result = await client.search({
            index: "product",
            body: {
                size:40,
                query: {
                    match_all: {}
                }
            }
        });
        // console.log(result.hits.hits)
        const documents = result.hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source
        }));
        res.status(200).json({ msg: "success", documents });
    } catch (err) {
        res.status(500).json({ msg: "failed", err });
    }
};