const axios = require('axios')

test("Photos Routes: Individual Photo Test", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/photos/IMG_6808.JPG")
    expect(response.status).toBe(200)
    expect(response.data[0]._id).toBe("IMG_6808.JPG")
    expect(response.data[0].tags).toBeTruthy
    expect(response.data.length).toEqual(1)
})