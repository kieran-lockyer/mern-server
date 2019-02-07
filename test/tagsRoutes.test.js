const axios = require('axios')
const moment = require('moment')
const expect = require('expect')

describe("Tags Routes", () => {
    it("Individual Tag Test", async () => {
        const response = await axios.get("http://localhost:3001/tags/5c459270633c7f0059372e60")
        expect(response.status).toBe(200)
        expect(response.data[0]._id).toBe("5c459270633c7f0059372e60")
        expect(response.data[0].source.type).toBeTruthy
        expect(response.data.length).toEqual(1)
    })

    it("Related Images Test", async () => {
        const response = await axios.get("http://localhost:3001/tags/related/banana")
        expect(response.status).toBe(200)
        expect(response.data.length).toBe(3)
        expect(response.data[0]._id.length).toBe(24)
    })

    it("Paginated Filter Test", async () => {
        const response = await axios.get("http://localhost:3001/tags?pageNo=1&limit=10&field=dateAdded&order=desc&label=banana")
        expect(response.status).toBe(200)
        expect(response.data.page).toBe(1)
        expect(response.data.limit).toBe(10)
        expect(response.data.docs[0].label).toBe("banana")
        expect(moment(response.data.docs[0].dateAdded).isAfter(response.data.docs[1].dateAdded)).toBe(true)
    })
})
