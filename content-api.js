require('dotenv').config()
const createClient = require('contentful').createClient

const SPACE = process.env.CONTENTFUL_SPACE
const TOKEN = process.env.CONTENTFUL_TOKEN

const client = createClient({
  space: SPACE,
  accessToken: TOKEN
})

const getPage = async (page) => {
  console.log('> Starting pages import:', page)
  try {
    const entries = await client.getEntries({
      content_type: 'page',
      'fields.title': page,
      include: 4
    })
    console.log('> Content recieved for page:', page)
    return entries.items[0]
  } catch (err) {
    console.error('> Failed to get content for page:', page, err)
  }
}

module.exports = {
  getPage
}
