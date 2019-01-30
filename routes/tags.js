const express = require("express")
const router = express.Router()
const Tags = require("../models/TagModel")
const Photos = require("../models/PhotoModel")

router.get("/", (req, res) => {
  const options = {
    page: req.query.pageNo,
    limit: parseInt(req.query.limit)
  }
  options['sort'] = {}
  options.sort[req.query.field] = req.query.order
  let filter
  if (req.query.label) {
    filter = { label: { $regex: `.*${req.query.label}.*` } }
  }
  Tags.paginate(filter, options).then(
    photos => res.json(photos)
  ).catch(
    error => res.status(500).json({
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

router.get("/filter/:label", (req, res) => {
  Tags.find()
    .then(tags => {
      console.log(tags)
      res.json(tags)
    })
    .catch(err => console.log(err))
})

router.get("/stats/:n", async (req, res) => {
  const result = []
  for (let n = req.params.n; n >= 0; n--) {
    console.log(n)
    await Tags.find(
      {
        $and: [
          {
            dateAdded:
            {
              $lte:
                new Date((new Date().getTime() - (n * 24 * 60 * 60 * 1000)))
            }
          },
          {
            dateAdded:
            {
              $gte:
                new Date((new Date().getTime() - ((n + 1) * 24 * 60 * 60 * 1000)))
            }
          }]
      }).then(res => {
        console.log(res)
        result.push(res.length)
      }).catch(err => console.log('NOPE', err))
  }
  res.send(result)
})

router.get("/stats/get/trendingtags", (req, res) => {
  console.log('fetching')
  Tags.aggregate([
    {
      $match: {
        dateAdded:
        {
          $gte:
            new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
        }
      }
    }, {
      $sortByCount: "$label"
    }])
    .then(popTags => {
      popTags = popTags.slice(0, 5)
      res.json(popTags)
    })
})

router.get("/stats/get/poptags", (req, res) => {
  console.log('fetching')
  Tags.aggregate([{ $unwind: "$label" }, { $sortByCount: "$label" }])
    .then(popTags => {
      popTags = popTags.slice(0, 5)
      res.json(popTags)
    })
})

router.get("/stats/get/avgtags", (req, res) => {
  console.log('fetching')
  Tags.find({ dateAdded: { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } })
    .then(tags => {
      result = (tags.length / 7).toFixed(1)
      res.json(result)
    })
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

module.exports = router
