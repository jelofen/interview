import express from 'express';
import 'express-async-errors';

import errorHandler from 'middlewares/errorHandler';
import logMiddleware from 'middlewares/logger';
import BaseMode from 'repo/baseModel';
import { api, getModelId, getModelName } from 'tools/utils';

const router = express.Router();

router.use(logMiddleware);

router.get('*', async (req, res) => {
  let path = req.path;
  let modelName = getModelName(path);
  let modelId = getModelId(modelName);
  let model = new BaseMode(modelName, modelId);
  let data = await api(path);
  if (!Array.isArray(data)) {
    data = [data];
  }
  let yourDate = new Date();
  let date = yourDate.toISOString().split('T')[0];
  for (let item of data) {
    item.date = date;
  }
  await model.upsertMany(data);
  res.json(data);
});

router.use(errorHandler);

export default router;
