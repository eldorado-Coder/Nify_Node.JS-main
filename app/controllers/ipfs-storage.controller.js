const { storeInIPFS } = require('./../services/moralis')

// Storing data to IPFS Storage.
exports.storeInIpfs = async (req, res) => {

    const { path, content } = req.body;

    if (!path || !content) {
        res.send(422, {
            message: "Invalid Data"
        })
        return;
    }

    storeInIPFS(path,content).then(result => {
        res.send({
            result
        })
    }).catch(err => {
        res.send(400, {
            message: err.message
        })
    })

};