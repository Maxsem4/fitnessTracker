const path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
  });

  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/exercise.html"));
  });
};
