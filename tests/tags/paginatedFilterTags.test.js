const axios = require('axios')
const moment = require('moment')

test("Tags Routes: Paginated Filter Test", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/tags?pageNo=1&limit=10&field=dateAdded&order=desc&label=banana")
    expect(response.status).toBe(200)
    expect(response.data.page).toBe(1)
    expect(response.data.limit).toBe(10)
    expect(response.data.docs[0].label).toBe("banana")
    expect(moment(response.data.docs[0].dateAdded).isAfter(response.data.docs[1].dateAdded)).toBe(true)
})