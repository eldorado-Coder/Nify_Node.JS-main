const axios = require('axios')

// Retrieve and return all nfts from the Opensea and Rarible.
exports.getAllNfts = (req, res) => {
    let responseData = {
        nfts: {
            opensea: [],
            rarible: []
        }
    };
    axios.all([
        axios.get('https://api.opensea.io/api/v1/assets'),
        axios.get('https://api-staging.rarible.com/protocol/v0.1/ethereum/nft/items/all')
    ]).then(axios.spread((res1, res2) => {
        if (res1.data && res1.data.hasOwnProperty('assets')) {
            responseData.nfts.opensea = res1.data.assets;
        }
        if (res2.data && res2.data.hasOwnProperty('items')) {
            responseData.nfts.rarible = res2.data.items;
        }
        return res.send(responseData)

    })).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving nfts."
        });
    })
};