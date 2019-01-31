const axios = require('axios')

test("Tags Routes: Trending Tags Test", async () => {
    const response = await axios.get('https://ca-mern-server.herokuapp.com/tags/stats/get/trendingtags')
    expect(response.status).toBe(200)
    expect(response.data.length).toBe(5)
    expect(typeof response.data[0].count).toBe("number")
    expect(typeof response.data[0]._id).toBe("string")
})