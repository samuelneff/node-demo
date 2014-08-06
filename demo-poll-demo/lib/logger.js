module.exports = function logger(req, res, next) {
  console.log("%s %s", req.method, req.url);
  next();
};
