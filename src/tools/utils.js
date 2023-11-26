import axios from 'axios';
import { badRequestError } from 'errors';

export async function api(path) {
  try {
    let response = await axios.get(`https://api.nilu.no/${path}`);
    return response.data;
  } catch {
    throw badRequestError('invalid path params');
  }
}

export function getModelName(path) {
  let chunks = path.split('/');
  if (chunks[1] == 'agg') {
    return chunks[1];
  }
  return `${chunks[1]}_${chunks[2]}`;
}

export function getModelId(modelName) {
  let modelsWithoutId = ['uv_forecas', 'lookup_areas', 'lookup_components', 'lookup_aqis'];
  if (modelsWithoutId.includes(modelName)) {
    return 'date';
  }
  return 'id';
}
