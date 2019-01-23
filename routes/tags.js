const express = require("express");
const router = express.Router();
const Tags = require("../models/TagModel");

router.get("/", (req, res) => {
  // Pagination Config
  // Test @ http://localhost:3001/tags?pageNo=1&size=5
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = { error: true, message: "invalid page number" };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;

  // Get the total count
  Tags.countDocuments({}, (err, totalCount) => {
    if (err) {
      response = { error: true, message: "Error fetching data" };
    }
    // Find all tags
    Tags.find({}, {}, query, (err, data) => {
      if (err) {
        response = { error: true, message: "Error fetching data" };
      } else {
        const totalPages = Math.ceil(totalCount / size);
        response = { error: false, data, pages: totalPages };
      }
      res.json(response);
    });
  });
});

router.delete("/:id", (req, res) => {
  Tags.findByIdAndRemove(req.params.id)
    .then(() => res.send(204))
    .catch(error =>
      res.status(500).json({
        error: error.message
      })
    );
});

module.exports = router;
