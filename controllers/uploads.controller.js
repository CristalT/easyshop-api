const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, '../public/files/');

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

exports.upload = function(req, res) {
    const form = new formidable.IncomingForm();

    form.uploadDir = folder;
    form.parse(req);
    form.on('fileBegin', function (name, file){
        console.log(name)
        file.path = folder + file.name;
    });

    form.on('file', function (name){
        res.status(200).send({ message: 'File successfully saved!', filename: name});
    }).on('error', function(error) {
        res.status(403).json(error)
    });
};
