const mongoose = require('mongoose');

const { 
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASS,
    MONGO_DB 
} = process.env;

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
}

if (process.env.PROD) {
    const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
}

mongoose.connect(uri, options).then(() => {
    console.log('Mongoose connected')
}).catch(err => {
    console.log('Error al conectar con la base de datos.')
})
