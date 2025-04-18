const { logEvents } = require("./logEvents");

// Global hata yakalama middleware'i
const errorHandler = (err, req, res, next) => {
  // Hata mesajlarını loglama
  const errorMessage = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvents(errorMessage, "errLog.log");

  console.error(err.stack);
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status);

  // Hata mesajını yanıt olarak döndürme
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
