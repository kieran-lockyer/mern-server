const axios = require('axios')
const moment = require('moment')
const expect = require('expect')

describe("Photos Routes", () => {
    it("Individual Photo Test", async () => {
        const response = await axios.get("http://localhost:3001/photos/IMG_6808.JPG")
        expect(response.status).toBe(200)
        expect(response.data[0]._id).toBe("IMG_6808.JPG")
        expect(response.data[0].tags).toBeTruthy
        expect(response.data.length).toEqual(1)
    })

    it("Paginated Filter Test", async () => {
        const response = await axios.get("http://localhost:3001/photos?pageNo=1&limit=10&field=dateAdded&order=asc&tags=uni")
        expect(response.status).toBe(200)
        expect(response.data.page).toBe(1)
        expect(response.data.limit).toBe(10)
        expect(response.data.docs[0].tags[0].label).toBe("unicycle, monocycle")
        expect(moment(response.data.docs[0].dateAdded).isAfter(response.data.docs[1].dateAdded)).toBe(false)
    })

    it("Sends Image", async () => {
        const response = await axios.get("http://localhost:3001/photos/image/IMG_6808.JPG")
        expect(response.status).toBe(200)
        expect(response.data).toBeTruthy
    })
})
