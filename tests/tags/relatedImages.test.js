const axios = require('axios')

test("Tags Routes: Related Images Test", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/tags/images/related/banana")
    expect(response.status).toBe(200)
    expect(response.data.length).toBe(3)
    expect(response.data[0]._id.length).toBe(24)
})