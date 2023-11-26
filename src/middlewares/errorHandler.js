export default function errorHandler(err, req, res, next) {
  console.error(
    JSON.stringify({
      path: req.path,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
    })
  );
  console.error(err);

  let statusCode = err && err.statusCode ? err.statusCode : 500;
  let message = err && err.errorMessage ? err.errorMessage : 'Internal server error';
  res.status(statusCode).send({ errors: { message } });
}
