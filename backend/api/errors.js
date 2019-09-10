const missingParameter = (params = []) => {
  params = (!Array.isArray(params)) ? [ params ] : params;
  const errorMessage = `Missing required parameter(s): ${ params.join(', ') }`;
  return new Error(errorMessage);
};

const responseError = (fname = null, expects = null) => {
  const errorMessage = `Wrong response in function ${fname}; expected ${expects}`;
  return new Error(errorMessage);
};

module.exports = {
  missingParameter,
  responseError,
};
