const express = require("express");
const router = express.Router();
const Tags = require("../models/TagModel");

router.get("/", (req, res) => {
  const options = {
    page: req.query.pageNo,
    limit: 10
  }
  Tags.paginate({}, options).then(
    tags => res.json(tags)
  ).catch(
    error => res.status(500).json({
      error: error.message
    })
  )
})

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
