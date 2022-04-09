function makeDataApi(data, status = 200, message = ''){
    return {data, status, message}
}

function gererErreur(err, res){
    console.log(err);
    res.status(400).send({message: err.message})
}

function getOffset(page, size){
    return (page-1) * size;
}

function getPäge(req){
    let page = req.query.page? req.query.page: 1;
    return page;
}

function getCountPage(size, count){
    return Math.ceil(count/size);
}

function getPaginateData(data, page, count, size){
    let nbPage = getCountPage(size, count);
    return {data, page, count, nbPage};
}

async function getCollectionPagine(cond, req, collection){
    let count = await getCount(cond, collection);
    let size = 10;
    let page = getPäge(req);
    let offset = getOffset(page, size);
    let data = await Resto.find(cond).skip(offset).limit(size);
    return getPaginateData(data, page, count, size); 
}

async function getCount(cond, collection){
    return await collection.count(cond);
}

// Uploader un fichier base64 vers le serveur
function uploadFile(content, path){
    let writeStream = fs.createWriteStream(path);
    let base64result = content.substr(content.indexOf(',') + 1);
    // write some data with a base64 encoding
    writeStream.write(base64result, 'base64');
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    writeStream.end();
}


module.exports = {
    makeDataApi,
    gererErreur,
    getOffset,
    getPaginateData,
    getCollectionPagine,
    uploadFile
}