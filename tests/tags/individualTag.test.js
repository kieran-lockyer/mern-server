const axios = require('axios')

test("Tags Routes: Individual Tag Test", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/tags/5c459270633c7f0059372e60")
    expect(response.status).toBe(200)
    expect(response.data[0]._id).toBe("5c459270633c7f0059372e60")
    expect(response.data[0].source.type).toBeTruthy
    expect(response.data.length).toEqual(1)
})