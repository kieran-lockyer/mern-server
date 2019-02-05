module.exports = (days) => {
    return (
        [
            {
                $match: {
                    dateAdded: {
                        $gte:
                            new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000))
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
            }
        ]
    )
}