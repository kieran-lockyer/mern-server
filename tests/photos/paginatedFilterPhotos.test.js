const axios = require('axios')
const moment = require('moment')

test("Photos Routes: Paginated Filter Test", async () => {
    const response = await axios.get("https://ca-mern-server.herokuapp.com/photos?pageNo=1&limit=10&field=dateAdded&order=asc&tags=uni")
    expect(response.status).toBe(200)
    expect(response.data.page).toBe(1)
    expect(response.data.limit).toBe(10)
    expect(response.data.docs[0].tags[0].label).toBe("unicycle, monocycle")
    expect(moment(response.data.docs[0].dateAdded).isAfter(response.data.docs[1].dateAdded)).toBe(false)
})