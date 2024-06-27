import dotenv from 'dotenv';

dotenv.config();

const ServerConfig = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_REDIRECT_URL: process.env.GOOGLE_CLIENT_REDIRECT_URL,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};

export default ServerConfig;