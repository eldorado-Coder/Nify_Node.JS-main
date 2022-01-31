module.exports = (app) => {
    const Nify = require('../controllers/nify.controller.js');
    const nft = require('../controllers/nft.controller.js');
    const ipfs = require('../controllers/ipfs-storage.controller.js')

    // Create a new Note
    app.post('/signup', Nify.create);

    // Retrieve all Notes
    app.post('/login', Nify.findAll);

    // Retrieve a single Note with noteId
    // app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    // app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    // app.delete('/notes/:noteId', notes.delete);

    //Retrieve list of assets
    app.get('/nft/all', nft.getAllNfts)

    //Storing in IPFS
    app.post('/store/ipfs', ipfs.storeInIpfs)
}