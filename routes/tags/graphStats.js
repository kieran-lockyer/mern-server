const Tags = require("../../models/TagModel")

module.exports = async (req, res) => {
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
}