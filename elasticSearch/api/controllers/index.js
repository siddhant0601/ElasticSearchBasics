const client = require('../../elasticClient');

exports.createIndex = async (req, res, next) => {
    try {
        const indexName = req.body.indexName;
        const result = await client.indices.create({ index: indexName });
        res.status(200).json({ message: "Success: Index created", result });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Query failed", details: err.message });
    }
};

exports.viewAllIndices = async (req, res, next) => {
    try {
        const result = await client.cat.indices({ format: 'json' });
        res.status(200).json({ message: "Success: Retrieved all index names", result });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Query failed" , details: err.message });
    }
};
