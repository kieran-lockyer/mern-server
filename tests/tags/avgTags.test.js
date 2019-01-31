const axios = require('axios')

test("Tags Routes: Average Tags Test", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/tags/stats/get/avgtags")
    expect(response.status).toBe(200)
    expect(RegExp('[a-z]', "gi").test(response.data)).toBe(false)
})