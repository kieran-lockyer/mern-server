const axios = require('axios')

test("Tags Routes: Graph Stats Test 7 Days", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/tags/stats/7")
    expect(response.status).toBe(200)
    expect(response.data.length).toEqual(7)
})

test("Tags Routes: Graph Stats Test 30 Days", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/tags/stats/30")
    expect(response.status).toBe(200)
    expect(response.data.length).toEqual(30)
})

test("Tags Routes: Graph Stats Test 180 Days", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/tags/stats/180")
    expect(response.status).toBe(200)
    expect(response.data.length).toEqual(180)
})

test("Tags Routes: Graph Stats Test 365 Days", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/tags/stats/365")
    expect(response.status).toBe(200)
    expect(response.data.length).toEqual(365)
})