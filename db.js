const mongoose = require('mongoose');

const { MONGO_DB } = process.env;

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
}


const uri = `mongodb://db/${MONGO_DB}`;

mongoose.connect(uri, options).then(() => {
    console.log('Mongoose connected')
}).catch(err => {
    console.log('Error al conectar con la base de datos.')
})
