import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false,
};

const NAME_DB = process.env.NAME_DB || 'CRUD';
const MONGO_PORT = "27017";
const MONGO_HOST = process.env.CONTAINER_HOST || "127.0.0.1";

//mongodb://127.0.0.1:27017/CRUD


const MONGO = {
    url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${NAME_DB}`,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8080;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER,
    option: MONGO_OPTIONS
};

export default config;