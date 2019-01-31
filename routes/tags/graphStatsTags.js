const Tags = require("../../models/TagModel")
const moment = require('moment')

module.exports = async (req, res) => {
    await Tags.aggregate(
        [
            {
                $match: {
                    dateAdded: {
                        $gte:
                            new Date(new Date().getTime() - (req.params.n * 24 * 60 * 60 * 1000))
                    }
                }
            },
            {
                $project: {
                    year: { $year: "$dateAdded" },
                    month: { $month: "$dateAdded" },
                    dayOfMonth: { $dayOfMonth: "$dateAdded" }
                }
            },
            {
                $group: {
                    _id: {
                        year: '$year',
                        month: '$month',
                        dayOfMonth: '$dayOfMonth'
                    },
                    count: {
                        $sum: 1
                    }
                }
            }]
    ).then(dates => {
        console.log(dates)
        let result = []
        for (let day = req.params.n - 1; day >= 0; day--) {
            let checkDate = moment().subtract(day, 'days').format('L').split('/')
            console.log(checkDate)
            let dateFound = false
            for (let date of dates) {
                if (date._id.month === parseInt(checkDate[0]) &&
                    date._id.dayOfMonth === parseInt(checkDate[1]) &&
                    date._id.year === parseInt(checkDate[2])) {
                    dateFound = true
                    result.push(date.count)
                }
            }
            if (!dateFound) {
                result.push(0)
            }
        }
        console.log(result)
        res.send(result)
    }).catch(err => console.log('NOPE', err))
}