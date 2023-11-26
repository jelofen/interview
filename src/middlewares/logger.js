import { randomUUID } from 'crypto';

export default async function logMiddleware(req, res, next) {
  let id = randomUUID();
  console.log('[req]: ', { id });
  let start = new Date();
  await next();
  let end = new Date();
  console.log('[res]: ', { id, processTime: `${end - start}ms` });
}
