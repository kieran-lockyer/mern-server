const axios = require('axios')
const expect = require('expect')

describe("Stats Routes", () => {
    it("Average Photos Test", async () => {
        const response = await axios.get("http://localhost:3001/stats/avgphotos")
        expect(response.status).toBe(200)
        expect(RegExp('[a-z]', "gi").test(response.data)).toBe(false)
    })

    it("Average Tags Test", async () => {
        const response = await axios.get("http://localhost:3001/stats/avgtags")
        expect(response.status).toBe(200)
        expect(RegExp('[a-z]', "gi").test(response.data)).toBe(false)
    })

    it("Popular Tags Test", async () => {
        const response = await axios.get('http://localhost:3001/stats/poptags')
        expect(response.status).toBe(200)
        expect(response.data.length).toBe(5)
        expect(typeof response.data[0].count).toBe("number")
        expect(typeof response.data[0]._id).toBe("string")
    })

    it("Trending Tags Test", async () => {
        const response = await axios.get('http://localhost:3001/stats/trendingtags')
        expect(response.status).toBe(200)
        expect(response.data.length).toBe(5)
        expect(typeof response.data[0].count).toBe("number")
        expect(typeof response.data[0]._id).toBe("string")
    })

    describe("Graph Stats", () => {
        it("Test 7 Days", async () => {
            const response = await axios.get("http://localhost:3001/stats?model=tags&days=7")
            expect(response.status).toBe(200)
            expect(response.data.length).toEqual(7)
        })

        it("Test 30 Days", async () => {
            const response = await axios.get("http://localhost:3001/stats?model=tags&days=30")
            expect(response.status).toBe(200)
            expect(response.data.length).toEqual(30)
        })

        it("Test 180 Days", async () => {
            const response = await axios.get("http://localhost:3001/stats?model=tags&days=180")
            expect(response.status).toBe(200)
            expect(response.data.length).toEqual(180)
        })

        it("Test 365 Days", async () => {
            const response = await axios.get("http://localhost:3001/stats?model=tags&days=365")
            expect(response.status).toBe(200)
            expect(response.data.length).toEqual(365)
        })
    })
})
