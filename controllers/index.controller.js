function welcomeMessage(req, res) {
  req.res.json({
    message: "Welcome to the API",
    docUrl: `${req.protocol}://${req.hostname}:${
      process.env.PORT || "3000"
    }/api/docs`,
  });
}

module.exports = {
  welcomeMessage,
};
