import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import apiRoutes from './routes/index.mjs'
import { ServerConfig, connectDB } from './config/index.js'

const app = express();

(async () => {
  try {
    await connectDB(ServerConfig.MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Error: ", error);
  }
})();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser("anything"));
app.use(
  session({
    secret: "void",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server successfully started on port : ${ServerConfig.PORT}`);
});

 