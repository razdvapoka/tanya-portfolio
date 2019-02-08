require('dotenv').config()
const createClient = require('contentful').createClient

const SPACE = process.env.CONTENTFUL_SPACE
const TOKEN = process.env.CONTENTFUL_TOKEN

const client = createClient({
  space: SPACE,
  accessToken: TOKEN
})

const getSection = async (section) => {
  console.log('> Starting section import:', section)
  try {
    const entries = await client.getEntries({
      content_type: 'sections',
      'fields.title': section,
      include: 4
    })
    console.log('> Content recieved for section:', section)
    return entries.items[0]
  } catch (err) {
    console.error('> Failed to get content for section:', section, err)
  }
}

module.exports = {
  getSection
}
