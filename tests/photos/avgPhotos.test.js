const axios = require('axios')

test("Photos Routes: Average Photos Test", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/photos/stats/get/avgphotos")
    expect(response.status).toBe(200)
    expect(RegExp('[a-z]', "gi").test(response.data)).toBe(false)
})