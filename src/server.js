import express from 'express';
import config from 'config';
import cors from 'startup/cors';
import { connectToDb } from 'startup/mongoUtil';

async function run() {
  try {
    const app = express();
    cors(app);
    await connectToDb();
    console.log(`Connected to mongodb...`);
    const apiRoutes = require('startup/routes').default;
    app.use('/', apiRoutes);
    app.listen(config.port, () => {
      console.log(`server listening on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error(`Error starting application: `);
    console.error(err);
    process.exit(1);
  }
}

run();
