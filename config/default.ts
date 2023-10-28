import * as dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ?? 3000;

const MONGO_DB_URI = process.env.MONGO_DB_URI;

export default {
    server: {
        port: SERVER_PORT,
    },
    db: {
        uri: MONGO_DB_URI,
    },
};
