const Moralis = require('moralis/node');
const { folderName, serverUrl, appId } = require('./config');

let isStarted = false;

function startMoralis() {
    if (isStarted) return;
    Moralis.start({ serverUrl, appId });
    isStarted = true;
}

async function storeInIPFS(name, imageContent) {
    startMoralis();

    const options = {
        abi: [
            {
                path: folderName + name,
                content: imageContent
            }
        ]
    };
    const result =  await Moralis.Web3API.storage.uploadFolder(options);
    return result.length ? (result[0].path ? result[0].path : false) : 'No Data';
}

module.exports = {
    storeInIPFS
}