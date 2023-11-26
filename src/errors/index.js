function badRequestError(message, statusCode = 400) {
  return { errorMessage: message, statusCode };
}

function internalServerError() {
  let statusCode = 500;
  let message = 'Internal server error';

  return { errorMessage: message, statusCode };
}

function itemNotFoundError(item) {
  let statusCode = 404;
  let message = `${item} not found`;

  return { errorMessage: message, statusCode };
}

function routeNotFoundError() {
  let statusCode = 404;
  let message = 'Route not found';

  return { errorMessage: message, statusCode };
}

export { badRequestError, internalServerError, itemNotFoundError, routeNotFoundError };
