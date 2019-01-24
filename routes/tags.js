const express = require("express");
const router = express.Router();
const Tags = require("../models/TagModel");
const Photos = require("../models/PhotoModel");

router.get("/", (req, res) => {
  const options = {
    page: req.query.pageNo,
    limit: 10
  };
  Tags.paginate({}, options)
    .then(tags => res.json(tags))
    .catch(error =>
      res.status(500).json({
        error: error.message
      })
    )
})

router.get("/:_id", (req, res) => {
  Tags.find({ _id: req.params._id })
    .then(tag => res.json(tag))
    .catch(error =>
      res.status(500).json({
        error: error.message
      })
    )
})

router.get("/images/:tag", (req, res) => {
  Tags.find({ "label": req.params.tag })
    .then(photos => res.json(photos))
    .catch(error =>
      res.status(500).json({
        error: error.message
      })
    )
})

router.delete("/:_id", (req, res) => {
  Tags.findByIdAndRemove(req.params._id)
    .then(() => res.send(204))
    .catch(error =>
      res.status(500).json({
        error: error.message
      })
    )
})

module.exports = router;
