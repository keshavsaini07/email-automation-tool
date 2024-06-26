import express from 'express';
import cors from 'cors';

import apiRoutes from './routes/index.js'
import { ServerConfig, connectDB } from './config/index.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api', apiRoutes);

(async () => {
  try {
    await connectDB(ServerConfig.MONGO_URL);
    console.log("Database Connected");
    app.listen(ServerConfig.PORT, () => {
      console.log(`Server successfully started on port : ${ServerConfig.PORT}`);
    });
  } catch (error) {
    console.log("Database Connection Error: ", error);
  }
})();


 