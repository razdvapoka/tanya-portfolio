require('dotenv').config()
const createClient = require('contentful').createClient

const SPACE = process.env.CONTENTFUL_SPACE
const TOKEN = process.env.CONTENTFUL_TOKEN

const client = createClient({
  space: SPACE,
  accessToken: TOKEN
})

const getEntityByField = async (type, field, value) => {
  console.log(`> Starting ${type} import:`, value)
  try {
    const entries = await client.getEntries({
      content_type: type,
      [`fields.${field}`]: value,
      include: 5
    })
    console.log(`> Content recieved for ${type}:`, value)
    return entries.items[0]
  } catch (err) {
    console.error(`> Failed to get content for ${type}:`, value, err)
  }
}

const getProject = async (id) => getEntityByField('project', 'id', id)
const getPage = async (title) => getEntityByField('page', 'title', title)
const getSection = async (hash) => getEntityByField('section', 'hash', hash)

module.exports = {
  getPage,
  getProject,
  getSection
}
