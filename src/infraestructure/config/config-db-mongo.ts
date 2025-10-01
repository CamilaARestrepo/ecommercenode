import mongoose from 'mongoose';


const MONGOATLAS_URL = process.env.MONGOATLAS_URL;
const DB_NAME = process.env.DB_NAME;

export const dbConnection = async () => {
    try {
        await mongoose.connect(`${MONGOATLAS_URL}/${DB_NAME}`);
        console.log('[DB-STATUS] Database connected');
    } catch (error) {
        console.error('[DB-STATUS] - Error connecting to the database', error);
        throw new error('[DB-STATUS] - Error connecting to the database');
    }

}