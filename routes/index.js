var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const mockEvents = [];
  res.render("index", {
    title: "Agile-Project",
    events: mockEvents,
  });
});

module.exports = router;