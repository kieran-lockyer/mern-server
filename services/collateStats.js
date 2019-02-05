const moment = require('moment')

module.exports = (dates, n) => {
    let result = []
    for (let day = n - 1; day >= 0; day--) {
        let checkDate = moment().subtract(day, 'days').format('L').split('/')
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
    return result
}