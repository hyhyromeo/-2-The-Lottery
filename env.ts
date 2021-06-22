import dotenv from 'dotenv';

dotenv.config()

export let env ={
    DB_NAME:process.env.DB_NAME,
    DB_USER:process.env.DB_USER,
    DB_PASS:process.env.DB_PASSWORD,
    HOST: process.env.HOST || 'localhost',
    PORT:+process.env.PORT! || 8080,
    SESSION_SECRET:process.env.SESSION_SECRET || Math.random().toString(),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

}